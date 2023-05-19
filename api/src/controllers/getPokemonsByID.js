const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { API_BASE_URL } = process.env;

//! 1. buscar por ID en la API
//! 2. Si no existe en la api buscar por la DB
//! 3. Si no existe en la DB retornar un error

const getPokemonById = async (req, res, next) => {
  const { id } = req.params;

  try {
    try {
      const pokemon = await axios.get(`${API_BASE_URL}/${id}`);
      const pokemonData = pokemon.data;

      return res.json({
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.other.dream_world.front_default,
        types: pokemonData.types.map((type) => type.type.name),
        attack: pokemonData.stats[1].base_stat,
        defense: pokemonData.stats[2].base_stat,
        speed: pokemonData.stats[5].base_stat,
        height: pokemonData.height,
        weight: pokemonData.weight,
        hp: pokemonData.stats[0].base_stat,
      });
    } catch (apiError) {
      if (apiError.response && apiError.response.status === 404) {
        const pokemonDB = await Pokemon.findByPk(id, {
          include: [
            {
              model: Type,
              attributes: ["name"],
              through: { attributes: [] },
            },
          ],
        });

        if (pokemonDB) {
          const {
            id,
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types,
          } = pokemonDB;
          return res.json({
            id,
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types: types.map((type) => type.name),
          });
        } else {
          return res.status(404).json({ message: "Pokemon not found" });
        }
      } else {
        return res
          .status(500)
          .json({ message: "Internal server error", error: apiError.message });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  getPokemonById,
};

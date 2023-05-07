const axios = require("axios");
const { API_URL } = process.env;
const { Pokemon, Type } = require("../db");

const findPokemonForName = async (req, res) => {
  const queryName = req.query.name;

  try {
    const pokemon = await axios.get(
      `${API_URL}/pokemon/${queryName.toLowerCase()}`
    );
    const { id, name, sprites, types } = pokemon.data;

    res.json({
      id,
      name,
      image:
        sprites.other.home.front_default ||
        sprites.other["official-artwork"].front_default,
      Types: types.map((type) => type.type.name),
    });
  } catch (errorAPI) {
    try {
      const pokemon = await Pokemon.findOne({
        where: { name: queryName.toLowerCase() },
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      if (pokemon) {
        const { id, Types, image } = pokemon;
        const nameBD = pokemon.name;

        res.json({
          id,
          image,
          name: setNamePokemonForClient(nameBD),
          Types: Types.map((type) => type.name),
        });
      } else {
        res.status(404).json({ message: "Pokemon not found" });
      }
    } catch (errorDB) {
      res.status(500).json({
        errorAPI: errorAPI.message,
        errorDB: errorDB.message,
      });
    }
  }
};

module.exports = {
  findPokemonForName,
};

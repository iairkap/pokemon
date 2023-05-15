const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const { API_BASE_URL } = process.env;

const getPokemons = async (req, res, next) => {
  try {
    const dataDB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const responseDB = dataDB?.map((data) => {
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
      } = data;
      return {
        id,
        image,
        name,
        Types: types.map((type) => type.name),
        attack,
        defense,
        speed,
        height,
        weight,
        hp,
      };
    });

    const pokemons = await axios.get(`${API_BASE_URL}?limit=60&offset=0`);

    const results = pokemons.data.results.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const dataAPI = await Promise.all(results);
    const responseAPI = dataAPI.map((data) => {
      const { id, name, sprites, stats, types, height, weight } = data.data;
      return {
        id,
        image:
          sprites.other.home.front_default ||
          sprites.other["official-artwork"].front_default,
        name,
        Types: types.map((type) => type.type.name),
        attack: stats[1].base_stat, //aca con stats me traigo el array de stats y con el indice accedo a la propiedad base_stat
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
        height,
        weight,
        hp: stats[0].base_stat,
      };
    });

    const response = dataDB ? [...responseDB, ...responseAPI] : responseAPI;
    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
};

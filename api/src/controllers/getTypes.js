const axios = require("axios");
const { Type } = require("../db");
const { API_BASE_URL } = process.env;

const getTypes = async (req, res, next) => {
  try {
    const typesDB = await Type.findAll();
    if (typesDB.length === 0) {
      const data = await axios.get("https://pokeapi.co/api/v2/type");
      const types = data.data.results.map((type) => {
        return {
          name: type.name,
        };
      });
      const newTypes = await Type.bulkCreate(types); //bulkCreate es un metodo de sequelize que me permite crear varios objetos a la vez.
      res.json(newTypes);
    } else {
      res.json(typesDB);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTypes,
};

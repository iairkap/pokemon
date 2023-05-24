const { Pokemon, Type } = require("../db");

function setNamePokemonForClient(name) {
  const lowercase = name.toLowerCase();
  const eliminateHyphes = lowercase.trim().split("-").join(" ");
  return eliminateHyphes;
}

const findPokemonForName = (req, res) => {
  const queryName = req.query.name;

  fetch(`https://pokeapi.co/api/v2/pokemon/${queryName.toLowerCase()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API error");
      }
      return response.json();
    })
    .then((pokemon) => {
      const { id, name, sprites, types } = pokemon;
      res.json({
        id,
        name,
        image:
          sprites.other.home.front_default ||
          sprites.other["official-artwork"].front_default,
        Types: types.map((type) => type.type.name),
      });
    })
    .catch((errorAPI) => {
      Pokemon.findOne({
        where: { name: queryName.toLowerCase() },
        include: [
          {
            model: Type,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      })
        .then((pokemon) => {
          if (pokemon) {
            const { id, types, image } = pokemon;
            const nameBD = pokemon.name;
            res.json({
              id,
              image,
              name: setNamePokemonForClient(nameBD),
              Types: types.map((type) => type.name),
            });
          } else {
            res.status(404).json({ message: "Pokemon not found" });
          }
        })
        .catch((errorDB) => {
          res.status(500).json({
            errorAPI: errorAPI.message,
            errorDB: errorDB.message,
          });
        });
    });
};

module.exports = {
  findPokemonForName,
};

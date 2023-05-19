/* POST | /pokemons
Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
Toda la información debe ser recibida por body.
Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos). */
const { Pokemon, Type } = require("../db.js");

const postPokemon = async (req, res) => {
  console.log("recibiendo datos del front:", req.body);

  const newPokemon = req.body;

  try {
    // Creando un nuevo Pokemon
    const createdPokemon = await Pokemon.create({
      name: newPokemon.name,
      image: newPokemon.image,
      hp: newPokemon.hp,
      attack: newPokemon.attack,
      defense: newPokemon.defense,
      speed: newPokemon.speed,
      height: newPokemon.height,
      weight: newPokemon.weight,
    });

    // Buscando los tipos en la base de datos
    const types = await Type.findAll({
      where: {
        id: newPokemon.types,
      },
    });

    // Asociando los tipos con el Pokemon
    await createdPokemon.addTypes(types);
    res.send(createdPokemon);
  } catch (error) {
    console.error("Error al crear el Pokémon:", error);
    res.status(500).json({ message: "Error al crear el Pokémon" });
  }
};

module.exports = {
  postPokemon,
};
/* 
const { Pokemon, Type } = require("../db.js");

const postPokemon = async (req, res) => {
  console.log("recibiendo datos del front:", req.body);

  const newPokemon = req.body;

  try {
    const createdPokemon = await Pokemon.create({
      name: newPokemon.name,
      image: newPokemon.image,
      hp: newPokemon.hp,
      attack: newPokemon.attack,
      defense: newPokemon.defense,
      speed: newPokemon.speed,
      height: newPokemon.height,
      weight: newPokemon.weight,
    });

    await createdPokemon.setTypes(newPokemon.types);
    res.send(createdPokemon);
  } catch (error) {
    console.error("Error al crear el Pokémon:", error);
    res.status(500).json({ message: "Error al crear el Pokémon" });
  }
};

module.exports = {
  postPokemon,
};
 */

const { Router } = require("express");
const { getPokemons } = require("../../controllers/getPokemons");
const { getTypes } = require("../../controllers/getTypes");
const { getPokemonById } = require("../../controllers/getPokemonsByID");
const { findPokemonForName } = require("../../controllers/getPokemonByName");
const { postPokemon } = require("../../controllers/postPokemon");
const Pokemon = Router();

Pokemon.get("/", getPokemons);
Pokemon.get("/types", getTypes);
Pokemon.get("/name", findPokemonForName);
Pokemon.get("/:id", getPokemonById);
Pokemon.post("/", postPokemon);

module.exports = Pokemon;

const { Router } = require("express");
const Pokemon = require("./Pokemon/pokemon.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PokemonRouter = Router();

PokemonRouter.use("/pokemon", Pokemon);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = PokemonRouter;

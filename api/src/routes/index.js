const { Router } = require("express");
const games = require("./videogames.js");
const genres = require("./genres.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", games);
router.use("/genres", genres);

module.exports = router;

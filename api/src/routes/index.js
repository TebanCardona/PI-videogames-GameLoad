const { Router } = require("express");
const games = require("./videogames.js");
const genres = require("./genres.js");
const platforms = require("./platforms.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.send({ message: "Okey" });
});

router.use("/videogames", games);
router.use("/genres", genres);
router.use("/platforms", platforms);
module.exports = router;

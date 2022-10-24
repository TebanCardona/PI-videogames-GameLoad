const { Router } = require("express");
const { getAllGames, getIdGame, postGame } = require("../controllers/games");
const router = Router();

router.get("", getAllGames);

router.get("/:idVideogame", getIdGame);

router.post("", postGame);
module.exports = router;

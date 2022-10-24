const { Router } = require("express");
const { Op, Videogame } = require("../db");
const {
  gamesApi,
  gamesNameApi,
  gameIdApi,
} = require("../controllers/requestaxios");
const { getAllGames } = require("../controllers/games");
const router = Router();

let data = {};

router.get("/", getAllGames);

router.get("/idVideogame");
// router.get("/:idVideogame", async (req, res) => {
//   let { idVideogame } = req.params;
//   idVideogame = parseInt(idVideogame);
//   if (!Boolean(idVideogame))
//     return res.status(400).send({ error: "url invalid" });
//   const { where } = req.query;
//   if (!where) return res.status(400).send({ error: "Need the query where!!!" });
//   if (where === "api") {
//     try {
//       await gameIdApi(idVideogame).then((e) => (data = e));
//     } catch (error) {
//       return res.status(400).send({ error: "ID invalid" });
//     }
//   }
//   if (where === "db") {
//     try {
//       const game = await Videogame.findByPk(idVideogame);
//       if (game === null) return res.status(400).send({ error: "ID invalid" });
//       data = game;
//     } catch (error) {
//       return res.status(404).send({ error });
//     }
//   }
//   // if (!data.id) return res.status(404).send({ error: "Id not found" });
//   res.send(data);
// });

module.exports = router;

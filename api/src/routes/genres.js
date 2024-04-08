const { Router } = require("express");
const { getAllGenres } = require("../controllers/genres.js");
const router = Router();

router.get("/", getAllGenres);

module.exports = router;

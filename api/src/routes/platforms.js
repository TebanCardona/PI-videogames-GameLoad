const { Router } = require("express");
const { getAllPlatforms } = require("../controllers/platforms.js");
const router = Router();

router.get("/", getAllPlatforms);

module.exports = router;

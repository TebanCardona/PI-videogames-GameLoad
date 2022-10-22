const { Router } = require("express");
const { Op, Videogame } = require("../db");
const { gamesApi } = require("./axios_request");

const router = Router();

let data = [];

router.get("/", async (req, res, next) => {
  await gamesApi.then((e) => data.push(e));
  next();
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  // const condition = name ? { where: { name: name } } : {};
  let condition = {};

  if (name) {
    condition = { where: { name: name } };
    let filter;
    console.log(data);
    data[0].forEach((e) => {
      if (e.name === name) {
        filter = e;
        return;
      }
    });
    if (filter) return res.send(filter);
    return res.status(404).send({ error: "data doesn`t exits" });
  }
  try {
    const gamesDb = await Videogame.findAll(condition);
    if (gamesDb.length > 0) data.push(gamesDb);
    return res.send(data);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;

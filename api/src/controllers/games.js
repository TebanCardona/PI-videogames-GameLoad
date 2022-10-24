// const e = require("express");
const { getGames, getGamesName } = require("./index");

const getAllGames = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    try {
      const games = await getGames();
      if (games.length === 0)
        return res.status(404).send({ error: "Not found games" });
      res.send(games);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    try {
      const games = await getGamesName(name.toLowerCase());
      if (games.length === 0)
        return res
          .status(404)
          .send({ error: `Not games found wiht this name ${name}` });
      res.send(games);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
const getIdGame = async (req, res) => "gato";
module.exports = {
  getAllGames,
};
("Error lens, ");

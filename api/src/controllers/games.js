// const e = require("express");
const { response } = require("express");
const { gameIdBd } = require("./requestdb");
const { gameIdApi } = require("./requestaxios");
const { getGames, getGamesName, saveGenresGet } = require("./index");
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");

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
const getIdGame = async (req, res) => {
  const { idVideogame } = req.params;
  idVideogame.length > 8
    ? (game = await gameIdBd(idVideogame))
    : (game = await gameIdApi(idVideogame));
  try {
    if (!game) return res.status(404).send({ error: "Id not found" });
    return res.send(game);
  } catch (error) {
    res.status(500).send(error);
  }
};
const postGame = async (req, res) => {
  const {
    name,
    image,
    description,
    released,
    rating,
    genres,
    platforms,
    createdVideoGame,
  } = req.body;
  try {
    if (!name || !description || !description || !platforms)
      return res.status(404).send({ error: "Send all date require" });
    let newGame = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      genres,
      platforms,
      createdVideoGame,
    });
    await saveGenresGet();
    let genresDb = await Genre.findAll({
      where: {
        name: {
          [Op.in]: req.body.genres,
        },
      },
    });
    await newGame.addGenres(genresDb);
    res.status(201).send({
      message: "Game add to Data Base",
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getAllGames,
  getIdGame,
  postGame,
};

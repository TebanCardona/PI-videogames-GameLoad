const { gameIdBd } = require("./requestdb");
const { gameIdApi } = require("./requestaxios");
const { getGames, getGamesName, saveGenresGet } = require("./index");
const { Op } = require("sequelize");
const { Videogame, Genre, conn } = require("../db");
const { errors } = require("../utils");

const getAllGames = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      try {
        const games = await getGames();
        if (games.length === 0)
          throw new errors.ClientError("Games not found", 404);

        res.send(games);
      } catch (error) {
        throw new errors.ClientError([error], 400);
      }
    } else {
      try {
        const games = await getGamesName(name.toLowerCase());
        if (games.length === 0)
          throw new errors.ClientError("Game not found", 404);
        res.send(games);
      } catch (error) {
        res.status(400).send([error]);
      }
    }
  } finally {
    await conn.close();
  }
};
const getIdGame = async (req, res) => {
  const { idVideogame } = req.params;
  idVideogame.length > 8
    ? (game = await gameIdBd(idVideogame))
    : (game = await gameIdApi(idVideogame));
  try {
    if (game === "Not found.")
      throw new errors.ClientError("Game not found", 404);
    res.send(game);
  } catch (error) {
    throw new errors.ClientError(error, 500);
  } finally {
    await conn.close();
  }
};
const postGame = async (req, res) => {
  const { name, image, description, released, rating, genres, platforms } =
    req.body;
  try {
    if (!name || !description || !genres || !platforms)
      throw new errors.ClientError("Send all information", 406);
    let findGame = await Videogame.findOne({ where: { name: name } });
    if (findGame)
      res
        .status(404)
        .send({ error: `the game ${name} is already in the database` });
    let newGame = await Videogame.create({
      name,
      image,
      description,
      released,
      rating,
      genres,
      platforms,
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
    throw new errors.ClientError(error, 400);
  } finally {
    await conn.close();
  }
};
module.exports = {
  getAllGames,
  getIdGame,
  postGame,
};

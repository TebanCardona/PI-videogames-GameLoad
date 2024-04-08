const { Videogame, Genre } = require("../db");
const OrganizeInfo = (game) => {
  return {
    id: game.id,
    name: game.name,
    image: game.image,
    rating: game.rating,
    released: game.released,
    description: game.description,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms,
  };
};
const favDb = async function () {
  try {
    const fav = await Fav.findAll({
      include: {
        model: Videogame,
        attributes: ["name", "id", "image"],
        through: {
          attributes: [],
        },
      },
    });
    return fav;
  } catch (error) {
    console.error(error);
  }
};
const gamesDb = async function () {
  try {
    const gamesDb = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let dataGames = gamesDb.map((game) => {
      return OrganizeInfo(game);
    });
    return dataGames;
  } catch (error) {
    console.error(error);
  }
};
const gamesNameDb = async (query) => {
  const games = await gamesDb();
  if (games.length > 0)
    return games.filter((game) => {
      return game.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  return [];
};
const gameIdBd = async (id) => {
  try {
    const game = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return OrganizeInfo(game);
  } catch (error) {
    return "Not found.";
  }
};
const getGenresDb = async function () {
  try {
    let genresDb = await Genre.findAll();
    genresDb = genresDb.map((genre) => genre.toJSON());
    return genresDb;
  } catch (error) {
    console.error(error);
  }
};
const postUserDB = async (name, password) => {
  console.log(name, password);
  const user = await User.create({ name, password });
  return user;
};

module.exports = {
  gamesDb,
  getGenresDb,
  gameIdBd,
  gamesNameDb,
  favDb,
  postUserDB,
};

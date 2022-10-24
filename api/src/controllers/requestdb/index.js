const { Videogame, Genre } = require("../../db");

const gamesDb = async function (name) {
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
    const game = await Videogame.findByPk(id);
    return game;
  } catch (error) {
    console.error(error);
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

module.exports = {
  gamesDb,
  getGenresDb,
  gameIdBd,
  gamesNameDb,
};

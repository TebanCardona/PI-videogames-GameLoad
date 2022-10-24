const { gamesApi, genresApi, gamesNameApi } = require("./requestaxios");
const { gamesDb, getGenresDb, gamesNameDb } = require("./requestdb");
const { Genre } = require("../db");

const saveGenresGet = async function () {
  try {
    let dataGenresDb = await getGenresDb();
    if (dataGenresDb.length === 0) {
      const genreApiData = await genresApi();
      await Genre.bulkCreate(genreApiData);
      dataGenresDb = await getGenresDb();
    }
    return dataGenresDb;
  } catch (error) {
    console.error(error);
  }
};
const getGames = () => {
  try {
    let info = Promise.all([gamesApi(), gamesDb()]).then((allInfo) => [
      ...allInfo[1],
      ...allInfo[0],
    ]);
    return info;
  } catch (error) {
    console.error(error);
  }
};
const getGamesName = async (name) => {
  try {
    let info = await Promise.all([gamesNameApi(name), gamesNameDb(name)]).then(
      (allInfo) => [...allInfo[1], ...allInfo[0]]
    );
    return info;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { saveGenresGet, getGames, getGamesName };

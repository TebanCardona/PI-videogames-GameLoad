const axios = require("axios");
const { apikey } = process.env;
const get = {
  method: "GET",
  url: "https://api.rawg.io/api/games",
  params: { key: apikey },
};
const data = [];
const saveInfo = function (game, save) {
  if (save) {
    if (data.length > 0 && data[0].id === game.id) {
      return data;
    } else {
      data.push({
        id: game.id,
        name: game.name,
        rating: game.rating,
        released: game.released,
        image: game.background_image,
        genres: game.genres.map((genre) => genre.name),
        platforms: game.platforms.map((p) => p.platform.name),
      });
    }
  } else {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating,
      released: game.released,
      description: game.description,
      genres: game.genres.map((genre) => genre.name),
      platforms: game.platforms.map((e) => e.platform.name),
    };
  }
};

const gamesApi = async () => {
  get.url = "https://api.rawg.io/api/games";
  try {
    for (let i = 0; i < 3; i++) {
      let gamesData = await axios.request(get);
      gamesData.data.results.forEach((game) => {
        saveInfo(game, true);
        get.url = gamesData.data.next;
      });
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const gamesNameApi = async function (name) {
  get.url = "https://api.rawg.io/api/games";
  get.params.search = name;
  const dataGames = [];
  try {
    const games = await axios.request(get);
    games.data.results.splice(0, 11).forEach((game) => {
      dataGames.push(saveInfo(game, false));
    });
    return dataGames;
  } catch (error) {
    console.error(error);
  }
};

const gameIdApi = async (id) => {
  try {
    get.url = `https://api.rawg.io/api/games/${id}`;
    const game = await axios.request(get);
    const dataGame = saveInfo(game.data, false);
    return dataGame;
  } catch (error) {
    console.error(error);
  }
};

const genresApi = async () => {
  try {
    get.url = "https://api.rawg.io/api/genres";
    const dataApi = await axios.request(get);
    const genres = dataApi.data.results.map((genre) => {
      return { name: genre.name };
    });
    return genres;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { gamesApi, gamesNameApi, gameIdApi, genresApi };

const axios = require("axios");
const { apikey } = process.env;
const get = {
  method: "GET",
  url: "https://api.rawg.io/api/games",
  params: { key: apikey },
};
const platform = new Set();
const OrganizeInfo = function (game) {
  return {
    id: game.id,
    name: game.name,
    image: game.background_image,
    rating: game.rating,
    released: game.released,
    description: game?.description,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((p) => {
      platform.add(p.platform.name);
      return p.platform.name;
    }),
  };
};

const gamesApi = async () => {
  const data = [];
  get.url = "https://api.rawg.io/api/games";
  if (get.params.search) delete get.params.search;
  try {
    for (let i = 0; i < 2; i++) {
      let gamesData = await axios.request(get);
      gamesData.data.results.forEach((game) => {
        data.push(OrganizeInfo(game));
      });
      get.url = gamesData.data.next;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

const gamesNameApi = async function (name) {
  get.url = `https://api.rawg.io/api/games`;
  get.params.search = name;
  const dataGames = [];
  try {
    const games = await axios.request(get);
    games.data.results.splice(0, 11).forEach((game) => {
      dataGames.push(OrganizeInfo(game));
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
    const dataGame = OrganizeInfo(game.data);
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
const platformApi = async () => {
  try {
    if (platform.size > 0) return platform;
    else {
      await gamesApi();
      return platform;
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { gamesApi, gamesNameApi, gameIdApi, genresApi, platformApi };

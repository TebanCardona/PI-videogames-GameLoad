const axios = require("axios");
const { apikey } = process.env;

const get = {
  method: "GET",
  url: "https://api.rawg.io/api/games",
  params: { key: apikey },
};

const requests = {
  gamesApi: axios
    .request(get)
    .then(function (response) {
      return response.data.results;
    })
    .catch(function (error) {
      console.error(error);
    }),
};

module.exports = requests;

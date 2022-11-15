const { favDb } = require("./requestdb");

const getFav = async function (req, res) {
  const dataFav = favDb()
  if (dataFav) {
    
  }
};

module.exports = {getFav,};

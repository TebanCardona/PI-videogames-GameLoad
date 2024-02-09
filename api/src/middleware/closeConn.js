const { conn } = require("../db");
module.exports = async (req, res, next) => {
  await conn.close();
};

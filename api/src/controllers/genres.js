const { conn } = require("../db");
const { saveGenresGet } = require("./index");
const getAllGenres = async (req, res) => {
  try {
    const genres = await saveGenresGet();
    if (genres.length === 0)
      return res.status(400).send({ error: "Not found genres" });
    return res.send(genres);
  } catch (error) {
    return res.status(400).send(error);
  } finally {
    await conn.close();
  }
};
module.exports = {
  getAllGenres,
};

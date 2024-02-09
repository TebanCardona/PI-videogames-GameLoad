const { conn } = require("../db");
const { saveGenresGet } = require("./index");
const getAllGenres = async (req, res) => {
  try {
    const genres = await saveGenresGet();
    if (genres.length === 0)
       res.status(400).send({ error: "Not found genres" });
     res.send(genres);
  } catch (error) {
     res.status(400).send(error);
  } finally {
    return await conn.close();
  }
};
module.exports = {
  getAllGenres,
};

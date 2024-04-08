const { errors } = require("../utils");
const { saveGenresGet } = require("./index");
const getAllGenres = async (req, res) => {
  try {
    const genres = await saveGenresGet();
    if (genres.length === 0)
      throw new errors.ClientError("Not found genres", 404);
    res.send(genres);
  } catch (error) {
    throw new errors.ClientError(error, 400);
  }
};
module.exports = {
  getAllGenres,
};

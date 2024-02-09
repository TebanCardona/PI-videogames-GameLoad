const { PlatformsGet } = require("./index");
const { conn } = require("../db");
const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await PlatformsGet();
    if (platforms.length === 0)
      throw new errors.ClientError("Platforms not found", 404);
    res.send(platforms);
  } catch (error) {
    throw new errors.ClientError(error, 400);
  } finally {
    return await conn.close();
  }
};
module.exports = {
  getAllPlatforms,
};

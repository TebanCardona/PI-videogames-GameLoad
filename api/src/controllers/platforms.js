const { PlatformsGet } = require("./index");
const { conn } = require("../db");
const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await PlatformsGet();
    if (platforms.length === 0)
      res.status(400).send({ error: "Not platforms found" });
    res.send(platforms);
  } catch (error) {
    res.status(400).send(error);
  } finally {
    return await conn.close();
  }
};
module.exports = {
  getAllPlatforms,
};

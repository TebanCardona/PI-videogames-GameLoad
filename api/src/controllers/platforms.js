const { PlatformsGet } = require("./index");
const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await PlatformsGet();
    if (platforms.length === 0)
      return res.status(400).send({ error: "Not platforms found" });
    return res.send(platforms);
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports = {
  getAllPlatforms,
};

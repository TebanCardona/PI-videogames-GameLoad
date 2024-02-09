const { PlatformsGet } = require("./index");

const getAllPlatforms = async (req, res) => {
  try {
    const platforms = await PlatformsGet();
    if (platforms.length === 0)
      throw new errors.ClientError("Platforms not found", 404);
    res.send(platforms);
  } catch (error) {
    throw new errors.ClientError(error, 400);
  }
};
module.exports = {
  getAllPlatforms,
};

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    relase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

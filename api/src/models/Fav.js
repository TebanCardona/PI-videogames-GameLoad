const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Fav",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );
};

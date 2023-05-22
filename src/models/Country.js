const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.TEXT,
        allowNull: false,
        //defaultValue: "https://i.ibb.co/RbzPYj5/flag-Neutra.png",
      },

      // continent: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   //type: DataTypes.STRING,
      //   allowNull: false, //HAY PAISES SIN CONTINENTES
      // },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      population: {
        type: DataTypes.FLOAT, // float: incluye numero decimal
        allowNull: false,
      },
      createdDb: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};

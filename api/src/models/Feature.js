const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo se relaciona con usuarios y productos
  sequelize.define('feature', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true ,
        primaryKey: true,
      },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spectrum: {
      type: DataTypes.ENUM("high", "medium", "low"),
      allowNull: false
    },
    backCameraDefinition: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frontCameraDefinition: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, { timestamps: false });
};
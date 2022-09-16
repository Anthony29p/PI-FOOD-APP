const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// No desactivar los timestamps automaticos ya que se definio validacion de filtros en rootReducer en base a la data de creacion
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    howToDo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdDB: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  }); 
};
 
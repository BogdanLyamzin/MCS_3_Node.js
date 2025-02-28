'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM("film", "serial"),
      defaultValue: "film",
    },
    releaseYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{4}$/,
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
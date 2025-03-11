import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";

import { typeList, releaseYearRegexp } from "../../constants/movies.js";

const Movie = sequelize.define("movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "director must be exist"
      },
      notEmpty: {
        msg: "director cannot be empty"
      }
    }
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.ENUM(...typeList),
    defaultValue: "film",
  },
  releaseYear: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: releaseYearRegexp,
    }
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Movie.sync({alter: true});

export default Movie;

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
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Movie.sync({force: true});

export default Movie;

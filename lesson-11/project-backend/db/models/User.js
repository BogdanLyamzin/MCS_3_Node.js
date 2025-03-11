import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";

import { emailRegexp } from "../../constants/auth.js";

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: emailRegexp,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// User.sync({alter: true});

export default User;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

export const signupUser = async payload => {
    const {email, password} = payload;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if(user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({...payload, password: hashPassword});
    return newUser;
}

export const siginUser = async payload => {
    const {email, password} = payload;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if(!user) {
        throw HttpError(401, "Email or password incorrect"); //throw HttpError(401, "User not found");
    }

    const paswordCompare = await bcrypt.compare(password, user.password);
    if(!paswordCompare) {
        throw HttpError(401, "Email or password incorrect"); //throw HttpError(401, "Password incorrect");
    }

    const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "24h"});

    return {
        token
    };
}
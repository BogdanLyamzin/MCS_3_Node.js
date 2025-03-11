import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

// const {JWT_SECRET} = process.env;
const {BASE_URL} = process.env;

const createVerifyEmail = (email, verificationCode) => {
    return {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    };
}

export const findUser = query => User.findOne({
    where: query,
})

export const updateUser = async (query, data)=> {
    const user = await findUser(query);
    if(!user) return null;

    return user.update(data, {
        returning: true,
    });
}

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
    const verificationCode = nanoid();
    
    const newUser = await User.create({...payload, password: hashPassword, verificationCode});

    const verifyEmail = createVerifyEmail(email, verificationCode);

    await sendEmail(verifyEmail);

    return newUser;
}

export const resendVerifyEmail = async(email)=> {
    const user = await findUser({email});
    if(!user || user.verify) {
        throw HttpError(401, "User not found or already verified");
    }

    const verifyEmail = createVerifyEmail(email, user.verificationCode);
    
    return sendEmail(verifyEmail);
}

export const verifyUser = async(verificationCode)=> {
    const user = await findUser({verificationCode});
    if(!user) {
        throw HttpError(401, "User not found or already verified");
    }

    return user.update({verificationCode: null, verify: true}, {
        returning: true,
    });
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

    if(!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password incorrect"); //throw HttpError(401, "Password incorrect");
    }

    // const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "24h"});
    const token = createToken({email});
    await user.update({token}, {
        returning: true,
    });

    return {
        token
    };
}

export const signoutUser = query => {
    return updateUser(query, {token: null});
}
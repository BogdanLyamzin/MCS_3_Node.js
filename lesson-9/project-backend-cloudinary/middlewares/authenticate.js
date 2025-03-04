// import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

import { findUser } from "../services/authServices.js";

import { verifyToken } from "../helpers/jwt.js";

// const {JWT_SECRET} = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }

  // const {email} = jwt.verify(token, JWT_SECRET);
  const { data, error } = verifyToken(token);
  if(error) {
    return next(HttpError(401, error.message));
  }
  
  const user = await findUser({ email: data.email });
  if (!user) {
    return next(HttpError(401, "User not found"));
  }
  req.user = user;

  next();
};

export default authenticate;

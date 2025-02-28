import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import { getMovies, getMovieById, addMovie, updateMovieById, deleteMovieById } from "../controllers/moviesControllers.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(getMovies));

moviesRouter.get("/:id",ctrlWrapper(getMovieById));

moviesRouter.post("/", validateBody(movieAddSchema), ctrlWrapper(addMovie));

moviesRouter.put("/:id", isEmptyBody, validateBody(movieUpdateSchema), ctrlWrapper(updateMovieById));

moviesRouter.delete("/:id", ctrlWrapper(deleteMovieById));

export default moviesRouter;
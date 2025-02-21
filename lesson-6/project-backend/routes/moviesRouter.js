import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import { getMovies, getMovieById, addMovie, updateMovieById, deleteMovieById } from "../controllers/moviesControllers.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";

const moviesRouter = express.Router();

moviesRouter.get("/", ctrlWrapper(getMovies));

moviesRouter.get("/:id", ctrlWrapper(getMovieById));

moviesRouter.post("/", validateBody(movieUpdateSchema), ctrlWrapper(addMovie));

moviesRouter.put("/:id", isEmptyBody, validateBody(movieUpdateSchema), ctrlWrapper(updateMovieById));

moviesRouter.delete("/:id", ctrlWrapper(deleteMovieById));

export default moviesRouter;
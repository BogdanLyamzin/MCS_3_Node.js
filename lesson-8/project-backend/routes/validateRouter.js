import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import { getMoviesValidations } from "../controllers/validationsControllers.js";

const validationRouter = Router();

validationRouter.get("/movies", ctrlWrapper(getMoviesValidations));

export default validationRouter;
import {Router} from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas.js";

import { signup, signin } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(authSignupSchema), ctrlWrapper(signup));

authRouter.post("/signin", validateBody(authSigninSchema), ctrlWrapper(signin));

export default authRouter;
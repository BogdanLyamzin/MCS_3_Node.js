import {Router} from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas.js";

import { signup, signin, getCurrent, signout } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(authSignupSchema), ctrlWrapper(signup));

authRouter.post("/signin", validateBody(authSigninSchema), ctrlWrapper(signin));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/signout", authenticate, ctrlWrapper(signout));

export default authRouter;
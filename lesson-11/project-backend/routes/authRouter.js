import {Router} from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import { authSignupSchema, authVerifySchema, authSigninSchema } from "../schemas/authSchemas.js";

import { signup, resendVerify, verify, signin, getCurrent, signout } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(authSignupSchema), ctrlWrapper(signup));

authRouter.post("/verify", validateBody(authVerifySchema),  ctrlWrapper(resendVerify));

authRouter.get("/verify/:verificationCode", ctrlWrapper(verify));

authRouter.post("/signin", validateBody(authSigninSchema), ctrlWrapper(signin));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/signout", authenticate, ctrlWrapper(signout));

export default authRouter;
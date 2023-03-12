import { Router } from "express";
import { authentication } from "./middlewares/authentication";
import { loginUserMiddleware } from "./middlewares/signIn/login-user";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { loginUserRouter } from "./userCase/signIn/login-user";
import { createUserRouter } from "./userCase/signUp/create-user";

const router = Router();

// create user end login user
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddleware, loginUserRouter);

// Transition

export { router };

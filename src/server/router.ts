import { Router } from "express";
import { authentication } from "./middlewares/authentication";
import { loginUserMiddleware } from "./middlewares/signIn/login-user";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { createCoversionMiddlware } from "./middlewares/transition/create-coversion";
import { loginUserRouter } from "./userCase/signIn/login-user";
import { createUserRouter } from "./userCase/signUp/create-user";
import { createConversion } from "./userCase/transition/create-conversion";

const router = Router();

// create user end login user
router.post("/users", createUserMiddleware, createUserRouter);
router.post("/login", loginUserMiddleware, loginUserRouter);

// Transition
router.post(
  "/transition",
  authentication,
  createCoversionMiddlware,
  createConversion
);

export { router };

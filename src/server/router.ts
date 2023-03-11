import { Router } from "express";
import { createUserMiddleware } from "./middlewares/signUp/create-user";
import { createUserRouter } from "./userCase/signUp/create-user";

const router = Router();

router.post("/users", createUserMiddleware, createUserRouter);

export { router };

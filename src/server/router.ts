import { Router } from "express";
import { createUserRouter } from "./userCase/signUp/create-user";

const router = Router();

router.post("/users", createUserRouter);

export { router };

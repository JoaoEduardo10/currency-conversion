import "express-async-errors";
import express from "express";
import "dotenv/config";
import { router } from "./router";
import { globalsErrorMiddleware } from "./middlewares/globals-errors";

const server = express();

server.use(express.json());

server.use("/v1", router);

server.use(globalsErrorMiddleware);

export { server };

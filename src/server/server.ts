import "express-async-errors";
import express from "express";
import "dotenv/config";
import { router } from "./router";
import { globalsErrorMiddleware } from "./middlewares/globals-errors";
import swagger from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const server = express();

server.use(express.json());

server.use(
  "/api-currency-conversion/documentation",
  swagger.serve,
  swagger.setup(swaggerDocs)
);

server.use("/v1", router);

server.use(globalsErrorMiddleware);

export { server };

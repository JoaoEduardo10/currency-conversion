import express from "express";
import "dotenv/config";
import { router } from "./router";

const server = express();

server.use(express.json());

server.use("/v1", router);

server.get("/", (req, res) => {
  res.send("ok tudo certo!");
});

export { server };

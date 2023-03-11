import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("ok tudo certo!");
});

export { server };

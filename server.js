const express = require("express");

const postsRouter = require("./posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  console.log("everything running smoothly");

  res.send(`
    <h2> Posts page</h>
    <p>Welcome to the website</p>
  `);
});

module.exports = server;

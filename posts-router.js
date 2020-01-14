const express = require("express");

const Posts = require("./data/db");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Cannot retrieve the posts"
      });
    });
});

module.exports = router;

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: " Cannot find any post with this id"
      });
    });
});

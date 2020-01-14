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
        error: "The posts information could not be retrieved."
      });
    });
});

module.exports = router;

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(400).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(postsComment => {
      if (postsComment) {
        res.status(200).json(postsComment);
      } else {
        res.status(400).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })

    .catch(error => {
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

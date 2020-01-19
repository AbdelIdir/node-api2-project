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
      console.log(posts[0].id);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(500).json({
          message: "The comments information could not be retrieved"
        });
      }
    })
    .catch(error => {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findById(req.params.id)
    .then(idcheck => {
      if (idcheck[0].id) {
        Posts.findPostComments(req.params.id)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(err =>
            res.status(500).json({
              error: "The comments information could not be retrieved."
            })
          );
      }
    })

    .catch(err =>
      res.status(404).json({
        error: "The post with the specified id does not exist"
      })
    );
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes || !changes.title || !changes.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
    return;
  }

  Posts.findById(id)
    .then(post => {
      const postJson = post;
      if (post[0].id) {
        Posts.update(id, changes)
          .then(post => {
            console.log(post);
            Posts.findById(id).then(newpost => res.status(200).json(newpost));
          })
          .catch(err => {
            res.status(500).json({
              message: "The post information could not be modified."
            });
          });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    });
});

router.post("/", (req, res) => {
  const newPost = req.body;

  if (!newPost || !newPost.title || !newPost.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post." });
    return;
  }

  Posts.insert(newPost)
    .then(newp => {
      Posts.findById(newp.id)
        .then(newp => res.status(201).json(newp[0]))
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the post to the database"
      });
    });
});

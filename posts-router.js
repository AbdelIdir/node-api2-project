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
        res.status(404).json({
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
        res.status(404).json({
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

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;
//     Posts.update(req.params.id, changes)
//         .then(post => {
//             if (changes.title && changes.contents) {
//                 res.status

//             } else {

//       }
//   });
// });

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Posts.update(id, changes)
    .then(post => {
      //     if (!changes.title || !changes.contents) {
      //       return res.status(400).json({
      //         errorMessage: "Please provide title and contents for the post."
      //       });
      //     }
      //     Posts.findById(id)
      //       .then(post => {
      //         if (post) {
      //           return Posts.update(id, changes);
      //         } else {
      //           res.status(404).json({
      //             message: "The post with the specified ID does not exist."
      //           });
      //         }
      //       })
      //       .then(() => Posts.findById(id))
      //       .then(post => res.status(200).json(post))
      //       .catch(error => {
      //         res.status(500).json({
      //           error: "The post information could not be modified."
      //         });
      //       });
      const idcheck = Posts.findById(id);

      if (changes.title && idcheck && changes.contents) {
        res.status(200).json(post);
      } else if (changes.title && changes.contents) {
        return res.status(404).json({
          message: "not working"
        });
      } else return res.status(400).json({ message: "bad" });
    })
    .catch(error => {
      res.status(500).json({ error: "not cool 500" });
    });
});

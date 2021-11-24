const express = require("express");
const router = express.Router();
const Post = require("../models/postSchema");
const Comment = require('../models/commentSchema')


//ROUTES FOR POST MODEL
//CREATE NEW POST
router.post("/", (req, res) => {
  Post.create(req.body).then((post) => {
    res.status(201).json({ status: 201, post: post });
  });
});

//GET ALL POSTS AVAILABLE FOR FEED
router.get("/", (req, res) => {
  Post.find().then((post) => {
    res.json({ status: 200, post: post });
  });
});

//UPDATE A POST
router.put("/:postId", (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.postId }, req.body, { new: true }).then(
    (post) => {
      res.status(200).json({ status: 200, post: post });
    }
  );
});

//DELETE A POST
router.delete("/:postId", (req, res) => {
  Post.deleteOne({ _id: req.params.postId }).then(() => {
    res.status(204).json();
  });
});

//ROUTES FOR COMMENT MODEL
//CREATE NEW COMMENT
router.post("/:postId", (req, res) => {
  Post.updateOne(
    {
      _id: req.params.postId,
    },
    {
      $push: { comments: req.body },
    //   $set: {likes : req.body}
    }
  )
    .then((post) => res.status(201).json({ status: 201, post: post }))
    // .catch((error) => console.log(error));
});

//UPDATE A COMMENT
router.put("/:postId/:commentId", (req, res) => {
  Post.updateOne(
    {
      _id: req.params.postId,
      "comments._id": req.params.commentId,
    },
    {
      $set: { "comments.$": req.body },
    }
  )
    .then((post) => res.status(201).json({ status: 201, post: post }))
    .catch((error) => console.log(error));
});


//DELETE A COMMENT
router.delete("/:postId/:commentId", (req, res) => {
  Post.updateOne(
    {
      _id: req.params.postId,
    },
    {
      $pull: { comments: { _id: req.params.commentId } },
    }
  )
    .then((post) => res.status(205).json({ status: 201, post: post }))
    .catch((error) => console.log(error));
});

//ADD LIKE TO POST
router.post("/likes/:postId", (req, res) => {
  Post.updateOne(
    {
      _id: req.params.postId,
    },
    {
      $set: { likes: req.body },
    }
  ).then((post) => res.status(201).json({ status: 201, post: post }));
  // .catch((error) => console.log(error));
});

module.exports = router;

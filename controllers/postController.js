const express = require("express");
const router = express.Router();
const Post = require("../models/postSchema");

router.post("/", (req, res) => {
  Post.create(req.body).then((post) => {
    res.status(201).json({ status: 201, post: post });
  });
});

router.get("/", (req, res) => {
  Post.find().then((post) => {
    res.json({ status: 200, post: post });
  });
});

router.put("/:id", (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (post) => {
      res.status(200).json({ status: 200, post: post });
    }
  );
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(204).json();
  });
});

module.exports = router;

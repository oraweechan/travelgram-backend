const mongoose = require('../db/connection')

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  comments: [{ ref: "Comment", type: mongoose.Schema.Types.ObjectId }],
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post
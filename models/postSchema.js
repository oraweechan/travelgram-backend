const mongoose = require('../db/connection')
const commentSchema = new mongoose.Schema({comment: String})

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
  comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post
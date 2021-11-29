const mongoose = require('../db/connection')
const commentSchema = require('./commentSchema')
const likeSchema = require('./likeSchema')

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
  date: Date,
  likes: [likeSchema],
  comments: [commentSchema],
});

// const Post = mongoose.model('Post', postSchema)
module.exports = postSchema
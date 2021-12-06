const mongoose = require('../db/connection')
const postSchema = require('./postSchema')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [postSchema]
});

const User = mongoose.model('User', userSchema)
module.exports = User

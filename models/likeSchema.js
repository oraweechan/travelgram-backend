const mongoose = require("../db/connection");

const likeSchema = new mongoose.Schema({
  likes: {
      type: Number,
      default: 0,
  }
});

module.exports = likeSchema;

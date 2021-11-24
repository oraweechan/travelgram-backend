const mongoose = require("../db/connection");

const likeSchema = new mongoose.Schema({
  likes: Number
});

module.exports = likeSchema;

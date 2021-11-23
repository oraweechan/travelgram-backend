const mongoose = require('../db/connection')

const commentSchema = new mongoose.Schema({
    comments: String
})

module.exports = commentSchema;
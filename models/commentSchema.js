const mongoose = require('../db/connection')

const commentSchema = new mongoose.Schema({
    comment: String
})

module.exports = commentSchema;
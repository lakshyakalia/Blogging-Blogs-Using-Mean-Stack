const mongoose = require('mongoose')

const Schema = mongoose.Schema

const posts = new Schema({
    postTitle: {
        type: String
    },
    postContent: {
        type: String
    },
    postDate : {
        type: Date,
        default: Date.now
    },
    postAuthor: {
        type: String
    },
    postImage: {
        type: String
    }
})

module.exports = mongoose.model('posts',posts)
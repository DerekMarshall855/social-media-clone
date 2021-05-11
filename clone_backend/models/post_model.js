const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Message, User, Date (timestamps), _id (Auto Generated)
const Post = new Schema(
    {
        username: {type: String, required: true},
        message: {type: String, required: true},
        comments: {type: [String], required: true}
    },
    {timestamps: true},
    {collection: 'posts'}
);

module.exports = mongoose.model('posts', Post);
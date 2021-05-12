const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Message, User, Date (timestamps), _id (Auto Generated)
const Post = new Schema(
    {
        username: {type: String, required: true},
        message: {type: String, required: true},
        comments: {type: [{
            name: {type: String, required: false}, // Attach name + response to each comment
            response: {type: String, required: false}
        }], required: true}
    },
    {timestamps: true},
    {collection: 'posts'}
);

module.exports = mongoose.model('posts', Post);
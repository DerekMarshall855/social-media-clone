const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Does not require unique ID as we will not allow for repeated usernames, still generated automatically (mongoose)
const User = new Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true}
    },
    {timestamps: true},
    {collection: 'users'}
);

module.exports = mongoose.model('users', User);
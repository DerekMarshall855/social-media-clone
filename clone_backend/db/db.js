const mongoose = require('mongoose');

// Connect mongoose to twitter_clone mongodb
mongoose.connect('mongodb://127.0.0.1:27017/twitter_clone', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        .catch(e => {
            console.error('Connection Failed, ERROR: ', e.message);
        });

const db = mongoose.connection;

module.exports = db;
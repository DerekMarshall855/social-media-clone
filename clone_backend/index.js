const express = require('express');
const cors = require('cors');

const db = require('./db/db');

const user_router = require('./routes/user_router');
const post_router = require('./routes/post_router');

const app = express();
const apiPort = 9000;

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(cors());

db.on('error', console.error.bind(console, 'MognoDB connection error: '));

app.use('/user_api', user_router);
app.use('/post_api', post_router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
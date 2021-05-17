const express = require('express');

const PostCtrl = require('../controllers/post_ctrl');

const router = express.Router();

router.post('/create', PostCtrl.createPost); // Creates post with a User ID (UID), Date, message, and _id (MongoDB Generated unique ID)
router.get('/search/message/:message', PostCtrl.searchPostContent); // Searches for posts by content of message 
router.get('/search/name/:username', PostCtrl.searchPostUser);  // Searches posts by username, returns list
router.get('/search/id/:id', PostCtrl.searchPostID); // Searches post by ID, returns single post
router.get('/search/all', PostCtrl.getAllPosts); // Gets all posts, used on load, eventually used only for followed (getFollowedPosts)
router.get('/search/comments/:id', PostCtrl.getAllComments) // Gets all comments on a post with a specified ID
router.delete('/delete/:id', PostCtrl.deletePost); // Deletes post given UID
router.delete('/delete_all', PostCtrl.deleteAllPosts); // Deletes all posts and comments
router.put('/comments/edit/:id', PostCtrl.editCommentsByID); // Given an ID for a post it will edit that posts comments
router.put('/edit/:id', PostCtrl.editPost); // Edits post with id by updating message or comments. Send over message, comments, and _id

module.exports = router;
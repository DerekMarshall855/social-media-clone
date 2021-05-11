const express = require('express');

const UserCtrl = require('../controllers/user_ctrl');

const router = express.Router();

router.post('/create', UserCtrl.createUser); // Create User from JSON object (model in models folder)
router.post('/auth', UserCtrl.authUser); // Authorize User
router.get('/:username', UserCtrl.getUserByName); // Get User
router.delete('/:username', UserCtrl.deleteUser); // Delete User

module.exports = router;
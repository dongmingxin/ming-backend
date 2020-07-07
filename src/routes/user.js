const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const {
    getCurrentUser,
    addUser
} = require('../controllers/user');

router.get('/me', authGuard, getCurrentUser);
router.post('/', addUser);


module.exports = router;
const express = require('express');
const blog= require('../Controllers/authController');

const router = express.Router();

router.post('/register', blog.register);
router.post('/login', blog.login);

module.exports = router;

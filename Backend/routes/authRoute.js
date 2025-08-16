const express = require('express');
const router = express.Router();

const {
        register,
        login,
        logout,
        refreshAccessToken,
} = require('../controllers/authController');

router.post('/register',register);
router.post('/login',login);
router.post('/refreshAccessToken',refreshAccessToken);
router.get('/logout',logout);

module.exports = router;
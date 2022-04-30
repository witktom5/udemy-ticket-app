const express = require('express');
const router = express.Router();

//Controller
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser);

router.post('/login', loginUser);

module.exports = router;

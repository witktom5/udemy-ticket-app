const express = require('express');
const router = express.Router();

//Controller
const { registerUser } = require('../controllers/userController');

router.post('/', registerUser);

router.post('/login', (req, res) => {
  res.send('Login route');
});

module.exports = router;

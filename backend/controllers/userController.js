const catchAsync = require('../utils/catchAsync');

// Register a new user
// /api/users
// Public

module.exports.registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  res.send('Register route');
});

// Login a user
// /api/users/login
// Public

module.exports.loginUser = catchAsync(async (req, res) => {
  res.send('Login route');
});

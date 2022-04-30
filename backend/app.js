const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Connect to mongodb
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Support Desk API');
});

// Routes
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

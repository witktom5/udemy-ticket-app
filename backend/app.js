const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');

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

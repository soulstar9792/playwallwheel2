// server/index.js
const express = require('express');
const path = require('path');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const spinRoutes = require('./routes/spin'); // Import spin routes
const app = express();
const bot = require('./bot');

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes); // Register user routes
app.use('/api/spin', spinRoutes); // Register spin routes

// Middleware to serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


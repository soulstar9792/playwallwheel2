const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth');


app.use('/auth', authRoutes);

// Middleware to serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Define API routes here
app.get('/api/some-endpoint', (req, res) => {
  res.json({ data: "API response data" });
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

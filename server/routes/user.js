const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create/Update User
router.post('/user', async (req, res) => {
  const { userId, inventory } = req.body;

  try {
    // Upsert user
    const user = await User.findOneAndUpdate(
      { userId },
      { inventory },
      { upsert: true, new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Get User
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
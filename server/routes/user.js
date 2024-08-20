const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create/Update User
router.post('/user', async (req, res) => {
  const { discordId, inventory } = req.body;

  try {
    // Upsert user
    const user = await User.findOneAndUpdate(
      { discordId },
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
router.get('/user/:discordId', async (req, res) => {
  try {
    const user = await User.findOne({ discordId: req.params.discordId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
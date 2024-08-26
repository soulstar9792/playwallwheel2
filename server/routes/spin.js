// server/routes/spin.js
const express = require('express');
const router = express.Router();
const rewards = require('../const/reward.json'); // Import rewards JSON

// Generate a random spin and calculate score
router.post('/', (req, res) => {
    const { type, userId } = req.body;

    // Validate input
    if (!type || !userId) {
        return res.status(400).json({ error: 'Type and user ID are required.' });
    }

    // Check if the provided type exists in the rewards
    if (!rewards[type]) {
        return res.status(400).json({ error: 'Invalid spin type.' });
    }

    // Calculate a random angle for the spin
    const availableRewards = rewards[type];
    
    // Select a random reward from the available rewards
    const randomRewardIndex = Math.floor(Math.random() * availableRewards.length);
    const selectedReward = availableRewards[randomRewardIndex];
    
    // Get the angle based on the random reward index
    const randomAngle = 3240 + randomRewardIndex * 30 + Math.floor(Math.random() * 30);

    // Here you might want to save the score to the database associated with the user
    // Save score logic can be added here

    // Respond with the score, angle, and the selected reward
    res.json({ 
        score: selectedReward.amount, 
        angle: randomAngle, 
        message: selectedReward.message 
    });
});

module.exports = router;
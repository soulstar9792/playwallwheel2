// server/utils/updateInventory.js
const User = require('../models/User');
const rewards = require('../const/reward.json'); // Import rewards JSON
const { use } = require('../routes/auth');

// Update inventory based on the selected reward
async function updateInventory(userId, type, amount) {
    console.log('updateInventory', userId, type, amount);
    // Check if the provided type exists in the rewards
    if (!rewards[type]) {
        return;
    }

    // Find or create the user in the database
    let userRecord = await User.findOne({ id: userId });
    if (!userRecord) {
        userRecord = new User(userId);
    }

    switch (type) {
        case 'common_key_fragment':
            userRecord.inventory.commonKeyFragments += amount;
            break;
        case 'uncommon_key_fragment':
            userRecord.inventory.uncommonKeyFragments += amount;
            break;
        case 'rare_key_fragment':
            userRecord.inventory.rareKeyFragments += amount;
            break;
        case 'legendary_key_fragment':
            userRecord.inventory.legendaryKeyFragments += amount;
            break;
        case 'mythic_key_fragment':
            userRecord.inventory.mythicKeyFragments += amount;
            break;
        case 'coin':
            userRecord.inventory.communityCoins += amount;
            break;
        case 'friend_reroll':
            userRecord.inventory.friendRerolls += amount;
            break;
        case 'usdp_token':
            userRecord.inventory.usdpTokens += amount;
            break;
        case 'temp_luck_boost':
            userRecord.inventory.tempLuckBoost += amount;
            break;
        case 'key_box':
            userRecord.inventory.commonKeys += 1;
            userRecord.inventory.uncommonKeys += 1;
            userRecord.inventory.rareKeys += 1;
            userRecord.inventory.legendaryKeys += 1;
            userRecord.inventory.mythicKeys += 2;
            break;
        case 'vip_role':
            userRecord.inventory.vipRoles >= 1 ? userRecord.inventory.vipRoles : userRecord.inventory.vipRoles += amount;
            break;
        case 'playbucks_token':
            userRecord.inventory.playBucksTokens += amount;
            break;
    }
    await userRecord.save();
    return userRecord;
}

module.exports = updateInventory;
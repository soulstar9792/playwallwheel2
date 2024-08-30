// server/utils/updateInventory.js
const User = require('../models/User');
const rewards = require('../const/reward.json'); // Import rewards JSON
const wheeltypes = require('../const/wheeltypes.json');
const { use } = require('../routes/auth');

// Update inventory based on the selected reward
async function updateInventory(userId, type, rewardType, rewardAmount) {
    console.log('updateInventory', userId, type,rewardType, rewardAmount);
    // Check if the provided type exists in the rewards
    if (!rewards[type]) {
        return;
    }

    // Find or create the user in the database
    let userRecord = await User.findOne({ id: userId });
    if (!userRecord) {
        userRecord = new User(userId);
    }

    userRecord.inventory[`${type}Keys`] -= 1;
    if(type != 'mythic') {
        let nextType = wheeltypes[wheeltypes.indexOf(type) + 1];
        userRecord.inventory[`${nextType}KeyFragments`] += 1;
    }
    switch (rewardType) {
        case 'uncommon_key_fragment':
            userRecord.inventory.uncommonKeyFragments += rewardAmount;
            userRecord.inventory.uncommonKeys += Math.floor(userRecord.inventory.uncommonKeyFragments / 10);
            userRecord.inventory.uncommonKeyFragments = userRecord.inventory.uncommonKeyFragments % 10;
            break;
        case 'rare_key_fragment':
            userRecord.inventory.rareKeyFragments += rewardAmount;
            userRecord.inventory.rareKeys += Math.floor(userRecord.inventory.rareKeyFragments / 10);
            userRecord.inventory.rareKeyFragments = userRecord.inventory.rareKeyFragments % 10;
            break;    
        case 'legendary_key_fragment':
            userRecord.inventory.legendaryKeyFragments += rewardAmount;
            userRecord.inventory.legendaryKeys += Math.floor(userRecord.inventory.legendaryKeyFragments / 10);
            userRecord.inventory.legendaryKeyFragments = userRecord.inventory.legendaryKeyFragments % 10;
            break;
        case 'mythic_key_fragment':
            userRecord.inventory.mythicKeyFragments += rewardAmount;
            userRecord.inventory.legendaryKeys += Math.floor(userRecord.inventory.legendaryKeyFragments / 10);
            userRecord.inventory.legendaryKeyFragments = userRecord.inventory.legendaryKeyFragments % 10;
            break;
        case 'coin':
            userRecord.inventory.communityCoins += rewardAmount;
            break;
        case 'friend_reroll':
            userRecord.inventory.friendRerolls += rewardAmount;
            break;
        case 'usdp_token':
            userRecord.inventory.usdpTokens += rewardAmount;
            break;
        case 'temp_luck_boost':
            userRecord.inventory.tempLuckBoost += rewardAmount;
            break;
        case 'key_box':
            userRecord.inventory.commonKeys += 1;
            userRecord.inventory.uncommonKeys += 1;
            userRecord.inventory.rareKeys += 1;
            userRecord.inventory.legendaryKeys += 1;
            userRecord.inventory.mythicKeys += 2;
            break;
        case 'vip_role':
            userRecord.inventory.vipRoles >= 1 ? userRecord.inventory.vipRoles : userRecord.inventory.vipRoles += rewardAmount;
            break;
        case 'playbucks_token':
            userRecord.inventory.playBucksTokens += rewardAmount;
            break;
    }
    await userRecord.save();
    return userRecord;
}

module.exports = updateInventory;
// commands/inventory.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('View your inventory state'),
    
  async execute(interaction) {
    await interaction.deferReply(); // Defer the reply

    // Find or create the user in the database
    let userRecord = await User.findOne({ id: interaction.user.id});
    if (!userRecord) {
        userRecord = new User(interaction.user);
        await userRecord.save();
    }

    // Build the inventory message
    const inventory = userRecord.inventory;
    const inventoryMessage = `
      **Inventory for ${interaction.user.username}**:
      Common Keys: ${inventory.commonKeys}
      Uncommon Keys: ${inventory.uncommonKeys}
      Rare Keys: ${inventory.rareKeys}
      Legendary Keys: ${inventory.legendaryKeys}
      Mythic Keys: ${inventory.mythicKeys}
      Common Key Fragments: ${inventory.commonKeyFragments}
      Uncommon Key Fragments: ${inventory.uncommonKeyFragments}
      Rare Key Fragments: ${inventory.rareKeyFragments}
      Legendary Key Fragments: ${inventory.legendaryKeyFragments}
      Mythic Key Fragments: ${inventory.mythicKeyFragments}
      Community Coins: ${inventory.communityCoins}
      Play Bucks Tokens: ${inventory.playBucksTokens}
      USDP Tokens: ${inventory.usdpTokens}
    `;

    // Reply with the inventory information
    await interaction.editReply(inventoryMessage); // Edit the deferred message
  },
};
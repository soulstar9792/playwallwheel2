// commands/addcoins.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('addcoins')
      .setDescription('Add coins to a user')
      .addUserOption(option => 
          option.setName('user')
                .setDescription('The user to add coins to')
                .setRequired(true))
      .addIntegerOption(option => 
          option.setName('amount')
                .setDescription('The amount of coins to add')
                .setRequired(true)),
    
    async execute(interaction) {
        // Check if the command is executed by the server owner
        const { user, guild } = interaction;
        if (user.id !== guild.ownerId) {
            return interaction.reply({ content: 'Only the server owner can use this command!', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        // Make sure the amount is positive
        if (amount <= 0) {
            return interaction.reply({ content: 'You must specify a positive amount of coins to add.', ephemeral: true });
        }

        // Find the target user in the database
        let userRecord = await User.findOne({ userId: targetUser.id, guildId: guild.id });

        // If user is not found, create one
        if (!userRecord) {
            userRecord = new User({ userId: targetUser.id, guildId: guild.id, coins: 0 }); // Initialize with 0 coins if user not found
        }

        // Add coins to the user's balance
        userRecord.coins += amount;
        await userRecord.save();

        // Send confirmation message
        return interaction.reply({ content: `Successfully added ${amount} coins to ${targetUser.username}.`, ephemeral: true });
    },
};
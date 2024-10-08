// commands/add-inventory.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-inventory')
        .setDescription('Add items to a user\'s inventory')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to add items to')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('item')
                .setDescription('The type of item to add (common, uncommon, rare, legendary, mythic)')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('The amount of items to add')
                .setRequired(true)),

    async execute(interaction) {
        const { user, guild } = interaction;

        // Check if the user has Administrator permission
        const member = await guild.members.fetch(user.id);
        if (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You must have the Administrator permission to use this command!', ephemeral: true });
        }

        const targetUser = interaction.options.getUser('user');
        const item = interaction.options.getString('item').toLowerCase();
        const amount = interaction.options.getInteger('amount');

        // Make sure the amount is positive
        if (amount <= 0) {
            return interaction.reply({ content: 'You must specify a positive amount of items to add.', ephemeral: true });
        }

        // Validate the item type
        const validItems = ['common', 'uncommon', 'rare', 'legendary', 'mythic'];
        if (!validItems.includes(item)) {
            return interaction.reply({ content: `Invalid item type. Valid types are: ${validItems.join(', ')}`, ephemeral: true });
        }

        // Find or create the user in the database
        let userRecord = await User.findOne({ id: targetUser.id });
        if (!userRecord) {
            userRecord = new User({ id: targetUser.id, inventory: { commonKeys: 0, uncommonKeys: 0, rareKeys: 0, legendaryKeys: 0, mythicKeys: 0 } });
        }

        // Add items to the user's inventory based on the item type
        userRecord.inventory[`${item}Keys`] += amount; // adds a certain amount of the item type
        await userRecord.save();

        // Send confirmation message
        return interaction.reply({ content: `Successfully added ${amount} ${item} keys to ${targetUser.username}'s inventory.`, ephemeral: true });
    },
};
// commands/gift.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js'); // Updated for Discord.js v14
const User = require('../../models/User');

const cooldown = new Set();  // Set to track active cooldowns

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gift')
        .setDescription('Claim a gift!'),
    
    async execute(interaction) {
        const id = interaction.user.id;

        // Check if the user is on cooldown
        if (cooldown.has(id)) {
            return interaction.reply({ content: 'You need to wait before claiming another gift!', ephemeral: true });
        }

        // Create the ActionRow and Button
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('claimGift')
                    .setLabel('🎁 Claim Gift')
                    .setStyle(ButtonStyle.Primary) // Updated for Discord.js v14
            );

        await interaction.reply({ content: 'Press the button below to claim your gift!', components: [row] });

        // Add user to cooldown
        cooldown.add(id);

        // Set a timeout to remove the user from the cooldown after a specific time (e.g., 1 hour)
        setTimeout(() => {
            cooldown.delete(id);
        }, 3600000); // 1 hour
    },
};
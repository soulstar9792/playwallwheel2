const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give coins to another user')
    .addUserOption(option => option.setName('target').setDescription('The user to give coins to').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of coins to give').setRequired(true)),
  async execute(interaction) {
    const giverId = interaction.user.id;
    const guildId = interaction.guild.id;
    const targetUser = interaction.options.getUser('target');
    const amount = interaction.options.getInteger('amount');

    if (amount <= 0) return interaction.reply('Amount must be greater than 0.');

    let giver = await User.findOne({ userId: giverId, guildId });
    let receiver = await User.findOne({ userId: targetUser.id, guildId });

    if (!giver || giver.coins < amount) {
      return interaction.reply('You do not have enough coins.');
    }

    if (!receiver) {
      receiver = new User({ userId: targetUser.id, guildId });
    }

    giver.coins -= amount;
    receiver.coins += amount;

    await giver.save();
    await receiver.save();

    await interaction.reply(`You gave ${amount} coins to ${targetUser.username}.`);
  },
};
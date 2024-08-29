const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give coins to another user')
    .addUserOption(option => option.setName('target').setDescription('The user to give coins to').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of coins to give').setRequired(true)),
  async execute(interaction) {
    const giverId = interaction.user.id;
    const targetUser = interaction.options.getUser('target');
    const amount = interaction.options.getInteger('amount');

    if (amount <= 0) return interaction.reply('Amount must be greater than 0.');

    let giver = await User.findOne({ id: giverId });
    let receiver = await User.findOne({ id: targetUser.id });

    if (!giver || giver.inventory.communityCoinss < amount) {
      return interaction.reply('You do not have enough coins.');
    }

    if (!receiver) {
      receiver = new User(targetUser); 
    }

    giver.inventory.communityCoinss -= amount;
    receiver.inventory.communityCoinss += amount;

    await giver.save();
    await receiver.save();

    await interaction.reply(`You gave ${amount} coins to ${targetUser.username}.`);
  },
};

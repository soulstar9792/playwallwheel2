const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your coin balance'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    let user = await User.findOne({ userId, guildId });

    if (!user) {
      user = new User({ userId, guildId });
      await user.save();
    }

    await interaction.reply(`${interaction.user.username}, you have ${user.coins} coins.`);
  },
};


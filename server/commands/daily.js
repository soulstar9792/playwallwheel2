const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Collect your daily coins'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    let user = await User.findOne({ userId, guildId });

    if (!user) {
      user = new User({ userId, guildId });
      await user.save();
    }

    const now = new Date();
    const diff = now - user.lastDaily;

    if (diff < 86400000) {
      return interaction.reply('You have already collected your daily coins!');
    }

    user.coins += 100; // Daily coin amount
    user.dailyStreak += 1;
    user.lastDaily = now;
    await user.save();

    await interaction.reply(`You have collected 100 coins! You now have ${user.coins} coins.`);
  },
};

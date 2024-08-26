const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Display the top users by coins'),
  async execute(interaction) {

    const topUsers = await User.find({ }).sort({ coins: -1 }).limit(10);

    let leaderboard = '🏆 **Top 10 Users by Coins** 🏆\n';
    topUsers.forEach((user, index) => {
            leaderboard += `${index + 1}. <@${user.id}> - ${user.coins} coins\n`;
    });

    await interaction.reply(leaderboard);
  },
};

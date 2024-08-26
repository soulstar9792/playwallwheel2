const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Collect your daily coins'),
  async execute(interaction) {
     
    // Find or create the user in the database
    let userRecord = await User.findOne({ id: interaction.user.id });
    if (!userRecord) {
        userRecord = new User(interaction.user);
    }

    const now = new Date();
    const diff = now - userRecord.lastDaily;

    if (diff < 86400000) {
      return interaction.reply('You have already collected your daily coins!');
    }

    userRecord.coins += 100; // Daily coin amount
    userRecord.dailyStreak += 1;
    userRecord.lastDaily = now;
    await userRecord.save();

    await interaction.reply(`You have collected 100 coins! You now have ${userRecord.coins} coins.`);
  },
};

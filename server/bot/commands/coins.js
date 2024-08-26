const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your coin balance'),
  async execute(interaction) {
        
    // Find or create the user in the database
    console.log(interaction.user);
    let userRecord = await User.findOne({ id: interaction.user.id });
    if (!userRecord) {
        userRecord = new User(interaction.user);
        await userRecord.save();
    }

    await interaction.reply(`${interaction.user.username}, you have ${userRecord.coins} coins.`);
  },
};


const User = require('../models/User');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    console.log("Message Created");

    const userId = message.author.id;
    const guildId = message.guild.id;

    let user = await User.findOne({ userId, guildId });

    if (!user) {
      user = new User({ userId, guildId });
      await user.save();
    }
    // user.coins += 1; // Reward for each message
    user.xp += 15;
    if (user.xp >= user.level * 100) {
        user.level += 1;
        user.xp = 0;
        message.reply(`Congratulations <@${userId}>, you've leveled up to level ${user.level}!`);
    }
    user.messageCount += 1;
    user.lastMessage = new Date();
    await user.save();
  },
};

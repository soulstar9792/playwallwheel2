const User = require('../../models/User');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    console.log("Message Created");

    // Find or create the user in the database
    let userRecord = await User.findOne({ id: message.author.id});
    if (!userRecord) {
        userRecord = new User(message.author);
    }
    // user.coins += 1; // Reward for each message
    userRecord.xp += 15;
    if (userRecord.xp >= userRecord.level * 100) {
        userRecord.level += 1;
        userRecord.xp = 0;
        message.reply(`Congratulations <@${userRecordId}>, you've leveled up to level ${userRecord.level}!`);
    }
    userRecord.messageCount += 1;
    userRecord.lastMessage = new Date();
    await userRecord.save();
  },
};
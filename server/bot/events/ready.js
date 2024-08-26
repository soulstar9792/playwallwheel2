const User = require('../../models/User');

module.exports = {
  name: 'ready',
  async execute(message) {
    console.log("Bot is online.");
  },
};

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  inventory: {
    commonKeys: { type: Number, default: 0 },
    uncommonKeys: { type: Number, default: 0 },
    rareKeys: { type: Number, default: 0 },
    legendaryKeys: { type: Number, default: 0 },
    mythicKeys: { type: Number, default: 0 },
    commonKeyFragments: { type: Number, default: 0 },
    uncommonKeyFragments: { type: Number, default: 0 },
    rareKeyFragments: { type: Number, default: 0 },
    legendaryKeyFragments: { type: Number, default: 0 },
    mythicKeyFragments: { type: Number, default: 0 },
    communityCoins: { type: Number, default: 0 },
    playBucksTokens: { type: Number, default: 0 },
    usdpTokens: { type: Number, default: 0 },
  },
  roles: {
    temporaryLuckBoosts: { type: Number, default: 0 },
    vipPass: { type: Boolean, default: false },
    luckBoosts: {
      boost1: { type: Date },
      boost2: { type: Date },
      boost3: { type: Date },
      boost4: { type: Date },
      boost5: { type: Date },
    },
  },
  keyUsageHistory: [{
    action: String,
    date: { type: Date, default: Date.now },
  }],
  currencyTransactions: [{
    type: String,
    amount: Number,
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
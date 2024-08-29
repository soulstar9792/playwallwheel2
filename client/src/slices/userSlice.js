// client/src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '', // Corresponds to `id` in the UserSchema
    username: null, // Corresponds to `username`
    avatar: null, // Corresponds to `avatar`
    avatarDecoration: null, // Corresponds to `avatarDecoration`
    accentColor: null, // Corresponds to `accentColor`
    globalName: null, // Corresponds to `globalName`

    coins: 0, // Corresponds to `coins`
    xp: 0, // Corresponds to `xp`
    level: 1, // Corresponds to `level`
    messageCount: 0, // Corresponds to `messageCount`
    lastDaily: null, // Corresponds to `lastDaily`
    lastWeekly: null, // Corresponds to `lastWeekly`

    inventory: {
      commonKeys: 0, // Corresponds to `inventory.commonKeys`
      uncommonKeys: 0, // Corresponds to `inventory.uncommonKeys`
      rareKeys: 0, // Corresponds to `inventory.rareKeys`
      legendaryKeys: 0, // Corresponds to `inventory.legendaryKeys`
      mythicKeys: 0, // Corresponds to `inventory.mythicKeys`
      commonKeyFragments: 0, // Corresponds to `inventory.commonKeyFragments`
      uncommonKeyFragments: 0, // Corresponds to `inventory.uncommonKeyFragments`
      rareKeyFragments: 0, // Corresponds to `inventory.rareKeyFragments`
      legendaryKeyFragments: 0, // Corresponds to `inventory.legendaryKeyFragments`
      mythicKeyFragments: 0, // Corresponds to `inventory.mythicKeyFragments`
      communityCoins: 0, // Corresponds to `inventory.communityCoins`
      playBucksTokens: 0, // Corresponds to `inventory.playBucksTokens`
      usdpTokens: 0, // Corresponds to `inventory.usdpTokens`
    },

    roles: {
      temporaryLuckBoosts: 0, // Corresponds to `roles.temporaryLuckBoosts`
      vipPass: false, // Corresponds to `roles.vipPass`
      luckBoosts: {
        boost1: null, // Corresponds to `roles.luckBoosts.boost1`
        boost2: null, // Corresponds to `roles.luckBoosts.boost2`
        boost3: null, // Corresponds to `roles.luckBoosts.boost3`
        boost4: null, // Corresponds to `roles.luckBoosts.boost4`
        boost5: null, // Corresponds to `roles.luckBoosts.boost5`
      },
    },

    keyUsageHistory: [], // Corresponds to `keyUsageHistory` (array of objects)
    currencyTransactions: [], // Corresponds to `currencyTransactions` (array of objects)
    
    isMember: false, // Additional field if needed
  },
  reducers: {
    setUserData: (state, action) => {
      console.log('setUserData', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserData: (state) => {
      return {
        ...state,
        id: '',
        username: null,
        avatar: null,
        avatarDecoration: null,
        accentColor: null,
        globalName: null,
        
        coins: 0,
        xp: 0,
        level: 1,
        messageCount: 0,
        lastDaily: null,
        lastWeekly: null,
        
        inventory: {
          commonKeys: 0,
          uncommonKeys: 0,
          rareKeys: 0,
          legendaryKeys: 0,
          mythicKeys: 0,
          commonKeyFragments: 0,
          uncommonKeyFragments: 0,
          rareKeyFragments: 0,
          legendaryKeyFragments: 0,
          mythicKeyFragments: 0,
          communityCoins: 0,
          playBucksTokens: 0,
          usdpTokens: 0,
        },
        
        roles: {
          temporaryLuckBoosts: 0,
          vipPass: false,
          luckBoosts: {
            boost1: null,
            boost2: null,
            boost3: null,
            boost4: null,
            boost5: null,
          },
        },
        
        keyUsageHistory: [],
        currencyTransactions: [],
        isMember: false,
      };
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
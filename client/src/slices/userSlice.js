// client/src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    coins: 0,
    xp: 0,
    level: 1,
    messageCount: 0,
    lastDaily: null,
    lastWeekly: null,
    inventory: {},
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
  },
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserData: (state) => {
      return {
        ...state,
        id: '',
        coins: 0,
        xp: 0,
        level: 1,
        messageCount: 0,
        lastDaily: null,
        lastWeekly: null,
        inventory: {},
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
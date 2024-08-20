// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    coins: 0,
    inventory: {},
    isMember: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.coins = action.payload.coins;
      state.inventory = action.payload.inventory;
      state.isMember = action.payload.isMember;
    },
    clearUserData: (state) => {
      state.coins = 0;
      state.inventory = {};
      state.isMember = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
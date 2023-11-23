import { createSlice } from '@reduxjs/toolkit';
import { findAccessToken } from '@store/utils';

type InitialState = {
  authorized: boolean;
};

const initialState: InitialState = {
  authorized: Boolean(findAccessToken()),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn(state) {
      state.authorized = true;
    },

    loggedOut(state) {
      state.authorized = false;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

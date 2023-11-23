import { createSlice } from '@reduxjs/toolkit';
import { findAccessToken } from '../../utils';

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
    // TODO: naming
    signIn(state) {
      state.authorized = true;
    },

    signOut(state) {
      state.authorized = false;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

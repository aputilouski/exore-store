import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models';
import { findAccessToken } from '../../utils';

type InitialState = {
  user: null | User;
  authorized: boolean;
};

const initialState: InitialState = {
  user: null,
  authorized: Boolean(findAccessToken()),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, _: PayloadAction<string>) {
      state.authorized = true;
    },

    signOut(state) {
      state.authorized = false;
      state.user = null;
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

import { createListenerMiddleware } from '@reduxjs/toolkit';
import { authActions, authApi } from '../features/auth';
import { destroyAccessToken } from '../utils';

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: authActions.loggedOut,
  effect: (_, listenerApi) => {
    destroyAccessToken();
    listenerApi.dispatch(authApi.util.resetApiState());
  },
});

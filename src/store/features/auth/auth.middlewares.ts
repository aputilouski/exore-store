import { Middleware, createListenerMiddleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import router from '@router';
import { destroyAccessToken, saveAccessToken } from '../../utils';
import { authActions } from './auth.slice';
import { authApi } from './auth.api';

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: authActions.signIn,
  effect: action => {
    saveAccessToken(action.payload);
    router.replace(router.path.products);
  },
});

authListenerMiddleware.startListening({
  actionCreator: authActions.signOut,
  effect: (_, listenerApi) => {
    listenerApi.dispatch(authApi.util.invalidateTags(['User']));
    destroyAccessToken();
    router.replace(router.path.signIn);
  },
});

export const authGuardMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action) && action.payload?.status === 401) {
    notifications.show({ message: 'Unauthorized', color: 'red' });
    router.replace(router.path.signIn);
  }
  return next(action);
};

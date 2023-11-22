import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import router from '@router';

export const authGuardMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action) && action.payload?.status === 401) {
    notifications.show({ message: 'Unauthorized', color: 'red' });
    router.replace(router.path.signIn);
  }
  return next(action);
};

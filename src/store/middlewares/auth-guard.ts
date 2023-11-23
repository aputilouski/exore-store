import { Middleware, isRejected } from '@reduxjs/toolkit';
import { notifications } from '@mantine/notifications';
import router from '@router';

export const authGuardMiddleware: Middleware = () => next => action => {
  if (isRejected(action) && action.payload?.status === 401) {
    router.replace(router.path.signIn);
    notifications.show({ message: 'Unauthorized', color: 'red' });
  }
  return next(action);
};

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as Error).message === 'string'
  );
}

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
export const getApiErrorMessage = (error: unknown): string => {
  let message;
  if (isFetchBaseQueryError(error)) {
    if ('error' in error) message = error.error;
    else if (error.data) message = typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
  } else if (isErrorWithMessage(error)) message = error.message;
  if (!message) message = 'Oops. Something went wrong...';
  return message;
};

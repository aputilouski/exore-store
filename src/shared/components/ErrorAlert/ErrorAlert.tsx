import { Alert } from '@mantine/core';
import { getApiErrorMessage } from '@shared/utils';

type ErrorAlertProps = {
  error: unknown;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => (
  <Alert color="red" className="mb-3" variant="filled" title={getApiErrorMessage(error)} />
);

export default ErrorAlert;

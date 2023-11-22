import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from '@mantine/core';
import router from '@router';
import { useAppSelector } from '@store';

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authorized = useAppSelector(state => state.auth.authorized);

  if (authorized) return children;

  return (
    <div className="max-w-md mx-auto py-24">
      <Alert title="Not authorized" color="red" />
      <Button component={Link} to={router.path.signIn} className="mt-5" fullWidth variant="default">
        Sign In
      </Button>
    </div>
  );
};

export default AuthGuard;

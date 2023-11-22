import { useForm } from 'react-hook-form';
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { useSignInMutation } from '@store';
import { getApiErrorMessage } from '@shared/utils';
import { SignInParams, resolver } from './SignIn.helpers';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({ resolver, mode: 'onTouched' });

  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  return (
    <div className="content-center flex-col">
      <h2 className="mb-3.5 font-bold text-2xl">Sign In</h2>

      <form onSubmit={handleSubmit(signIn)} className="max-w-sm w-full mb-20">
        <div className="flex flex-col gap-2">
          <TextInput
            label="Username: mor_2314"
            placeholder="Username"
            {...register('username')}
            error={errors.username?.message}
          />
          <PasswordInput
            label="Password: 83r5^_"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        {isError && <Alert color="red" className="mt-3" title={getApiErrorMessage(error)} />}

        <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;

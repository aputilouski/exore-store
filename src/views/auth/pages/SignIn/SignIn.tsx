import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { ErrorAlert } from '@shared/components';
import router from '@router';
import { authActions, useAppDispatch, useSignInMutation } from '@store';
import { SignInParams, resolver } from './SignIn.helpers';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({ resolver, mode: 'onTouched' });

  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const handleSignIn: SubmitHandler<SignInParams> = async data => {
    const result = await signIn(data);
    if ('data' in result) {
      dispatch(authActions.signIn());
      router.replace(router.path.products);
    }
  };

  return (
    <div className="content-center flex-col">
      <h2 className="mb-3.5 font-bold text-2xl">Sign In</h2>

      <form onSubmit={handleSubmit(handleSignIn)} className="max-w-sm w-full mb-20">
        <div className="flex flex-col gap-2 mb-3">
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

        {isError && <ErrorAlert error={error} />}

        <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;

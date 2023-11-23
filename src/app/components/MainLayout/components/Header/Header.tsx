import { Button, Loader } from '@mantine/core';
import { authActions, useAppDispatch, useGetUserQuery } from '@store';
import router from '@router';
import NavLink from '../NavLink';

const Header: React.FC = () => {
  const { data: user, isLoading } = useGetUserQuery();

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOut());
    router.replace(router.path.signIn);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {!isLoading && user && (
          <div className="flex items-center gap-1">
            <div className="text-lg font-bold">{`${user.name.firstname} ${user.name.lastname}`}</div>
            <div className="text-sm">({user.email})</div>
          </div>
        )}
        {isLoading && <Loader size="sm" />}
      </div>

      <div className="flex-1 flex gap-5 font-semibold">
        <NavLink to={router.path.products} label="Products" className="flex-1 text-right" exact />
        <NavLink to={router.path.createProduct} label="Create Product" className="flex-1" />
      </div>

      <div className="flex-1 text-right">
        <Button color="red" onClick={handleSignOut}>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Header;

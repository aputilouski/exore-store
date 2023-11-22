import { Button, Loader } from '@mantine/core';
import { authActions, useAppDispatch, useGetUserQuery } from '@store';
import router from '@router';
import NavLink from '../NavLink';

const Header: React.FC = () => {
  const { data, isLoading } = useGetUserQuery();

  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {!isLoading && data && (
          <div className="flex items-center gap-1">
            <div className="text-lg font-bold">{`${data.name.firstname} ${data.name.lastname}`}</div>
            <div className="text-sm">({data.email})</div>
          </div>
        )}
        {isLoading && <Loader size="sm" />}
      </div>

      <div className="flex-1 flex gap-5 font-semibold">
        <NavLink to={router.path.products} label="Products" className="flex-1 text-right" exact />
        <NavLink to={router.path.createProduct} label="Create Product" className="flex-1" />
      </div>

      <div className="flex-1 text-right">
        <Button color="red" onClick={() => dispatch(authActions.signOut())}>
          Exit
        </Button>
      </div>
    </div>
  );
};

export default Header;

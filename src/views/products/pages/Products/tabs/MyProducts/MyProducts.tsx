import { Alert, LoadingOverlay } from '@mantine/core';
import { ErrorAlert } from '@shared/components';
import { useGetUserProductsQuery } from '@store';
import MyProductsTable from './components/MyProductsTable';
import { MyProductsLoadingPreview } from './MyProducts.elements';

const MyProducts: React.FC = () => {
  const { data: products, isLoading, isFetching, isError, error } = useGetUserProductsQuery();

  return (
    <>
      {isError && <ErrorAlert error={error} />}

      {isLoading && <MyProductsLoadingPreview />}

      {products?.length === 0 && <Alert color="gray" title="No Products" />}

      {Boolean(products?.length) && (
        <div className="relative">
          <LoadingOverlay visible={isFetching} />
          <MyProductsTable items={products!} />
        </div>
      )}
    </>
  );
};

export default MyProducts;

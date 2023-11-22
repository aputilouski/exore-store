import React from 'react';
import { Alert, Loader } from '@mantine/core';
import { ErrorAlert } from '@shared/components';
import { useGetProductsQuery } from '@store';
import router from '@router';
import ProductCard from './components/ProductCard';
import { LimitButtons, ProductsLoadingPreview } from './StoreProducts.elements';

const StoreProducts = () => {
  const [limit, setLimit] = React.useState(8);

  const { data: products, isLoading, isFetching, isError, error } = useGetProductsQuery(limit);

  return (
    <>
      {isError && <ErrorAlert error={error} />}

      {products?.length === 0 && <Alert color="gray" title="No Products" />}

      <div className="grid grid-cols-4 gap-6">
        {isLoading && <ProductsLoadingPreview />}

        {products?.map(product => (
          <ProductCard //
            key={product.id}
            onClick={() => router.push(router.path.forProduct(product.id))}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>

      {products && isFetching && <Loader className="!block mx-auto my-12" />}

      <LimitButtons setLimit={setLimit} />
    </>
  );
};

export default StoreProducts;

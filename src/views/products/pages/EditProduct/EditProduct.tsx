import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ProductEditor, ProductEditorParams } from '@views/products/components';
import { ErrorAlert } from '@shared/components';
import { useGetUserProductQuery, useUpdateProductMutation } from '@store';

const CreateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isFetching, isError, error } = useGetUserProductQuery(id);

  const [updatePost] = useUpdateProductMutation();

  const onSubmit = (data: ProductEditorParams) =>
    updatePost({ ...product!, ...data }).then(() => {
      notifications.show({ message: 'Product have been edited' });
    });

  return (
    <>
      {isError && <ErrorAlert error={error} />}

      {isLoading && <Loader className="!block mx-auto" />}

      {product && (
        <ProductEditor //
          mode="edit"
          product={product}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default CreateProduct;

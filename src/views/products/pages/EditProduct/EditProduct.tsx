import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ProductEditor, ProductEditorParams } from '@views/products/components';
import { useGetUserProductQuery, useUpdateProductMutation } from '@store';
import { getApiErrorMessage } from '@shared/utils';
import { DeleteProduct } from './EditProduct.elements';

const CreateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isFetching } = useGetUserProductQuery(id);

  const [updatePost] = useUpdateProductMutation();

  const onSubmit = async (data: ProductEditorParams) => {
    try {
      const result = await updatePost({ ...product!, ...data }).unwrap();
      notifications.show({ message: 'Product have been edited' });
      return result;
    } catch (error) {
      const message = getApiErrorMessage(error);
      notifications.show({
        title: 'Unexpected exception when updating a product',
        message,
        color: 'red',
      });
    }
  };

  return (
    <>
      {isLoading && <Loader className="!block mx-auto" />}

      {product && (
        <div className="relative">
          <LoadingOverlay visible={isFetching} />
          <ProductEditor //
            mode="edit"
            defaultValues={product}
            onSubmit={onSubmit}
          />
          <DeleteProduct product={product} />
        </div>
      )}
    </>
  );
};

export default CreateProduct;

import React from 'react';
import { notifications } from '@mantine/notifications';
import { ProductEditor } from '@views/products/components';
import { useCreateProductMutation } from '@store';
import { getApiErrorMessage } from '@shared/utils';

const CreateProduct: React.FC = () => {
  const [createPost] = useCreateProductMutation();

  const onSubmit = async (...args: Parameters<typeof createPost>) => {
    try {
      const result = await createPost(...args).unwrap();
      notifications.show({ message: 'Product have been created' });
      return result;
    } catch (error) {
      const message = getApiErrorMessage(error);
      notifications.show({
        title: 'Unexpected exception when creating a product',
        message,
        color: 'red',
      });
    }
  };

  return <ProductEditor mode="create" onSubmit={onSubmit} />;
};

export default CreateProduct;

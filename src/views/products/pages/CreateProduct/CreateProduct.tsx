import React from 'react';
import { notifications } from '@mantine/notifications';
import { ProductEditor } from '@views/products/components';
import { useCreateProductMutation } from '@store';

const CreateProduct: React.FC = () => {
  const [createPost] = useCreateProductMutation();

  const onSubmit = (...args: Parameters<typeof createPost>) =>
    createPost(...args).then(() => {
      notifications.show({ message: 'Product have been created' });
    });

  return <ProductEditor mode="create" onSubmit={onSubmit} />;
};

export default CreateProduct;

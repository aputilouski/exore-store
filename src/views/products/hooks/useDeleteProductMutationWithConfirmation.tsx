import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { getApiErrorMessage } from '@shared/utils';
import { Product, useDeleteProductMutation } from '@store';

export const useDeleteProductMutationWithConfirmation = (product: Product) => {
  const [mutation, queryInfo] = useDeleteProductMutation();

  const handleDelete = (callback?: () => void) =>
    modals.openConfirmModal({
      title: `Are you sure you want to delete "${product.title}"?`,
      labels: { confirm: 'Delete product', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          const result = await mutation(product.id).unwrap();
          if (callback) callback();
          notifications.show({ message: 'Product have been removed' });
          return result;
        } catch (error) {
          const message = getApiErrorMessage(error);
          notifications.show({
            title: 'Unexpected exception when deleting a product',
            message,
            color: 'red',
          });
        }
      },
    });

  return [handleDelete, queryInfo, mutation] as const;
};

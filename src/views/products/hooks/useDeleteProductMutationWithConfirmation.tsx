import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { Product, useDeleteProductMutation } from '@store';

export const useDeleteProductMutationWithConfirmation = (product: Product) => {
  const [mutation, queryInfo] = useDeleteProductMutation();

  const handleDelete = () =>
    modals.openConfirmModal({
      title: `Are you sure you want to delete "${product.title}"?`,
      labels: { confirm: 'Delete product', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        await mutation(product.id);
        notifications.show({ message: 'Comment have been removed' });
      },
    });

  return [handleDelete, queryInfo, mutation] as const;
};

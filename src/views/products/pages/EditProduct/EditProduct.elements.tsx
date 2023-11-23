import { Button } from '@mantine/core';
import router from '@router';
import { UserProduct } from '@store';
import { useDeleteProductMutationWithConfirmation } from '@views/products/hooks';

export const DeleteProduct: React.FC<{ product: UserProduct }> = ({ product }) => {
  const [handleDelete, { isLoading }] = useDeleteProductMutationWithConfirmation(product);
  return (
    <div className="text-center my-5">
      <Button //
        size="xs"
        color="red"
        onClick={() => handleDelete(router.goBack)}
        loading={isLoading}
      >
        Delete Product
      </Button>
    </div>
  );
};

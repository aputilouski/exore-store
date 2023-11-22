import { ActionIcon, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import router from '@router';
import { UserProduct } from '@store';
import { useDeleteProductMutationWithConfirmation } from '@views/products/hooks';

type MyProductsTableRowProps = {
  item: UserProduct;
};

const MyProductsTableRow: React.FC<MyProductsTableRowProps> = ({ item }) => {
  const [handleDelete, { isLoading }] = useDeleteProductMutationWithConfirmation(item);

  const handleEdit = () => router.push(router.path.forEditProduct(item.id));

  return (
    <Table.Tr>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>${item.price}</Table.Td>
      <Table.Td className="flex gap-2 justify-end">
        <ActionIcon //
          variant="subtle"
          size="md"
          onClick={handleEdit}
          children={<IconEdit />}
        />
        <ActionIcon //
          variant="subtle"
          size="md"
          color="red"
          onClick={handleDelete}
          loading={isLoading}
          children={<IconTrash />}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default MyProductsTableRow;

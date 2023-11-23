import { Table } from '@mantine/core';
import { UserProduct } from '@store';
import MyProductsTableRow from './MyProductsTableRow';
import React from 'react';

type MyProductsTableProps = {
  items: UserProduct[];
};

const MyProductsTable = React.memo<MyProductsTableProps>(({ items }) => (
  <Table>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Name</Table.Th>
        <Table.Th>Price</Table.Th>
        <Table.Th>Published</Table.Th>
        <Table.Th w={120} />
      </Table.Tr>
    </Table.Thead>

    <Table.Tbody>
      {items.map(item => (
        <MyProductsTableRow key={item.id} item={item} />
      ))}
    </Table.Tbody>
  </Table>
));

export default MyProductsTable;

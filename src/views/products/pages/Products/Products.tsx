import React from 'react';
import { Tabs } from '@mantine/core';
import StoreProducts from './tabs/StoreProducts';
import MyProducts from './tabs/MyProducts';

const Products: React.FC = () => (
  <Tabs defaultValue="store-products" keepMounted={false}>
    <Tabs.List justify="center" className="mb-3">
      <Tabs.Tab value="store-products">Store Products</Tabs.Tab>
      <Tabs.Tab value="my-products">My Products</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="store-products" children={<StoreProducts />} />
    <Tabs.Panel value="my-products" children={<MyProducts />} />
  </Tabs>
);

export default Products;

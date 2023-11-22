import React from 'react';
import { Tabs } from '@mantine/core';
import StoreProducts from './tabs/StoreProducts';
import MyProducts from './tabs/MyProducts';

const STORE_PRODUCTS_TAB = 'store-products';
const MY_PRODUCTS_TAB = 'my-products';

const Products: React.FC = () => {
  const [value, setValue] = React.useState<string | null>(() => localStorage.getItem('products-page-tab'));

  // TODO: move to store
  React.useEffect(() => {
    if (value) localStorage.setItem('products-page-tab', value);
  }, [value]);

  return (
    <Tabs value={value} onChange={setValue} keepMounted={false}>
      <Tabs.List justify="center" className="mb-3">
        <Tabs.Tab value={STORE_PRODUCTS_TAB}>Store Products</Tabs.Tab>
        <Tabs.Tab value={MY_PRODUCTS_TAB}>My Products</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={STORE_PRODUCTS_TAB} children={<StoreProducts />} />
      <Tabs.Panel value={MY_PRODUCTS_TAB} children={<MyProducts />} />
    </Tabs>
  );
};

export default Products;

import React from 'react';
import { Tabs } from '@mantine/core';
import StoreProducts from './tabs/StoreProducts';
import MyProducts from './tabs/MyProducts';
import { ProvideFilterByPublishing } from './components/ProvideFilterByPublishing';

const STORE_PRODUCTS_TAB = 'store-products';
const MY_PRODUCTS_TAB = 'my-products';

const Products: React.FC = () => {
  // saving tabs between page switches
  const [value, setValue] = React.useState<string | null>(() => localStorage.getItem('products-page-tab'));
  React.useEffect(() => {
    if (value) localStorage.setItem('products-page-tab', value);
    else setValue(STORE_PRODUCTS_TAB);
  }, [value]);

  return (
    <Tabs value={value} onChange={setValue} keepMounted={false}>
      <Tabs.List justify="center" className="mb-3">
        <Tabs.Tab value={STORE_PRODUCTS_TAB}>Store Products</Tabs.Tab>
        <Tabs.Tab value={MY_PRODUCTS_TAB}>My Products</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={STORE_PRODUCTS_TAB} children={<StoreProducts />} />
      <Tabs.Panel
        value={MY_PRODUCTS_TAB}
        children={
          <ProvideFilterByPublishing>
            <MyProducts />
          </ProvideFilterByPublishing>
        }
      />
    </Tabs>
  );
};

export default Products;

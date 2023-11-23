import { nanoid } from '@reduxjs/toolkit';
import { api } from '../../api';
import { Product, UserProduct } from '../../models';
import { CreateProductParams, CreateProductResponseData } from './products.types';

const sleep = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = api.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query<Product[], number | void>({
      query: (limit = 8) => ({ url: 'products', params: { limit } }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: build.query<Product, string>({
      query: id => 'products/' + id,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),

    createProduct: build.mutation<UserProduct, CreateProductParams>({
      query: body => ({ url: 'products', method: 'POST', body }),
      transformResponse(response: CreateProductResponseData, _meta, arg) {
        return {
          ...arg,
          ...response,
          id: nanoid(),
          category: 'other',
          image: 'https://i.pravatar.cc',
        };
      },
      onQueryStarted(arg, { queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
          localStorage.setItem('products', JSON.stringify([data, ...products]));
        });
      },
      invalidatesTags: () => [{ type: 'UserProducts', id: 'LIST' }],
    }),

    deleteProduct: build.mutation<void, string | number>({
      // query: id => ({ url: String(id), method: 'DELETE' }), // my product doesn't exist
      queryFn: async id => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        localStorage.setItem('products', JSON.stringify(products.filter(p => p.id !== id)));
        return { data: undefined };
      },
      invalidatesTags: () => [{ type: 'UserProducts', id: 'LIST' }],
    }),

    updateProduct: build.mutation<void, UserProduct>({
      queryFn: async values => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        const index = products.findIndex(p => p.id === values.id);
        products[index] = values;
        localStorage.setItem('products', JSON.stringify(products));
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, params) => [
        { type: 'UserProducts', id: params.id },
        { type: 'UserProducts', id: 'LIST' },
      ],
    }),

    getUserProducts: build.query<UserProduct[], void>({
      queryFn: async () => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]'); // TODO
        return { data: products };
      },
      providesTags: result => {
        const UserProductsList = { type: 'UserProducts', id: 'LIST' } as const;
        return result
          ? [...result.map(({ id }) => ({ type: 'UserProducts' as const, id })), UserProductsList]
          : [UserProductsList];
      },
    }),

    getUserProduct: build.query<UserProduct, string | number>({
      queryFn: async id => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);
        return product ? { data: product } : { error: { status: 'FETCH_ERROR', error: 'Product not found' } };
      },
      providesTags: (_result, _error, id) => [{ type: 'UserProducts', id }],
    }),
  }),
});

export const {
  useGetProductsQuery, //
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetUserProductsQuery,
  useGetUserProductQuery,
} = productsApi;

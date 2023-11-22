import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { nanoid } from '@reduxjs/toolkit';
import { Product, UserProduct } from '../../models';
import { prepareAuthHeaders } from '../../utils';
import { CreateProductParams, CreateProductResponseData } from './products.types';

const sleep = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const productsApi = createApi({
  reducerPath: 'api/products',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/products',
    prepareHeaders: prepareAuthHeaders,
  }),

  tagTypes: ['Products', 'UserProducts'],

  endpoints: build => ({
    getProducts: build.query<Product[], number | void>({
      query: (limit = 8) => ({ url: '', params: { limit } }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: build.query<Product, string>({
      query: id => id,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    createProduct: build.mutation<UserProduct, CreateProductParams>({
      query: body => ({ url: '', method: 'POST', body }),
      transformResponse(response: CreateProductResponseData, meta, arg) {
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
      // product does not exist
      // query: id => ({ url: String(id), method: 'DELETE' }),
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
      invalidatesTags: (result, error, params) => [
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
      providesTags: (result, error, id) => [{ type: 'UserProducts', id }],
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

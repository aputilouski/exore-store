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

  // tagTypes: ['Products'],

  endpoints: build => ({
    getProducts: build.query<Product[], number | void>({
      query: (limit = 8) => ({ url: '', params: { limit } }),
      // providesTags: result =>
      //   result
      //     ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
      //     : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: build.query<Product, string>({
      query: id => id,
    }),

    createProduct: build.mutation<UserProduct, CreateProductParams>({
      query: body => ({ url: '', method: 'POST', body }),
      // invalidatesTags: ['Comment'],
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
    }),

    deleteProduct: build.mutation<void, string | number>({
      // query: id => ({ url: String(id), method: 'DELETE' }), // product does not exist
      queryFn: async id => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        localStorage.setItem('products', JSON.stringify(products.filter(p => p.id !== id)));
        return { data: undefined };
      },
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
    }),

    getUserProduct: build.query<UserProduct, string | number>({
      queryFn: async id => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        const product = products.find(p => p.id === id);
        return product ? { data: product } : { error: { status: 'FETCH_ERROR', error: 'Product not found' } };
      },
    }),

    getUserProducts: build.query<UserProduct[], void>({
      queryFn: async () => {
        await sleep();
        const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
        return { data: products };
      },
    }),
  }),
});

export const {
  useGetProductsQuery, //
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetUserProductQuery,
  useGetUserProductsQuery,
} = productsApi;

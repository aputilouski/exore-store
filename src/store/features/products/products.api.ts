import { nanoid } from '@reduxjs/toolkit';
import { Product, UserProduct } from '@store/models';
import { api } from '../../api';
import { CreateProductParams, CreateProductResponseData } from './products.types';
import { userProductService } from './products.helpers';

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
          createdAt: new Date().toISOString(),
        };
      },
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          userProductService.addProduct(data);
        });
      },
      invalidatesTags: () => [{ type: 'UserProducts', id: 'LIST' }],
    }),

    deleteProduct: build.mutation<void, string | number>({
      // query: id => ({ url: String(id), method: 'DELETE' }), // error: user's product doesn't exist
      queryFn: async id => {
        await userProductService.deleteProduct(id);
        return { data: undefined };
      },
      invalidatesTags: () => [{ type: 'UserProducts', id: 'LIST' }],
    }),

    updateProduct: build.mutation<void, UserProduct>({
      queryFn: async values => {
        await userProductService.updateProduct(values);
        return { data: undefined };
      },
      invalidatesTags: (_result, _error, params) => [
        { type: 'UserProducts', id: params.id },
        { type: 'UserProducts', id: 'LIST' },
      ],
    }),

    getUserProducts: build.query<UserProduct[], boolean | undefined | void>({
      queryFn: async filterByPublishing => {
        const products = await userProductService.getProducts({ published: filterByPublishing ?? undefined });
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
        const product = await userProductService.findProduct(id);
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://fakestoreapi.com',
  prepareHeaders: headers => {
    const token = localStorage.getItem('access-token');
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['User', 'Products', 'UserProducts'],
  endpoints: () => ({}),
});

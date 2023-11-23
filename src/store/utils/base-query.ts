import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://fakestoreapi.com',
  prepareHeaders: headers => {
    const token = localStorage.getItem('access-token');
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

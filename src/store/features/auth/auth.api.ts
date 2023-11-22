import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../models';
import { prepareAuthHeaders } from '../../utils';
import { authActions } from './auth.slice';

export const authApi = createApi({
  reducerPath: 'api/auth',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
    prepareHeaders: prepareAuthHeaders,
  }),

  tagTypes: ['User'],

  endpoints: build => ({
    signIn: build.mutation<{ token: string }, { username: string; password: string }>({
      query: body => ({ url: 'auth/login', method: 'POST', body }),
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(authActions.signIn(data.token));
          dispatch(authApi.endpoints.getUser.initiate());
        });
      },
    }),

    getUser: build.query<User, void>({
      query: () => 'users/2',
      providesTags: ['User'],
      onQueryStarted(_, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(authActions.setUser(data));
        });
      },
    }),
  }),
});

export const { useSignInMutation, useGetUserQuery } = authApi;

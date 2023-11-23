import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '@store/models';
import { baseQuery, saveAccessToken } from '@store/utils';

export const authApi = createApi({
  reducerPath: 'api/auth',

  baseQuery,

  tagTypes: ['User'],

  endpoints: build => ({
    signIn: build.mutation<{ token: string }, { username: string; password: string }>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
      onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          saveAccessToken(data.token);
        });
      },
    }),

    getUser: build.query<User, void>({
      query: () => 'users/2',
      providesTags: ['User'],
    }),
  }),
});

export const { useSignInMutation, useGetUserQuery } = authApi;

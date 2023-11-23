import { api } from '../../api';
import { User } from '@store/models';
import { saveAccessToken } from '@store/utils';

export const authApi = api.injectEndpoints({
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

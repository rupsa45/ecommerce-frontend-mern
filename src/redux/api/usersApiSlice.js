import { apiSlice } from "./apislice";

const API_USER_URL = import.meta.env.VITE_USERS_URL;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${API_USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_USER_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${API_USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
    useLoginMutation, 
    useLogoutMutation ,
    useRegisterMutation
} = userApiSlice;

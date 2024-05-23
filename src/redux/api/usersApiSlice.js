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
    profile:builder.mutation({
      query: (data) => ({
        url: `${API_USER_URL}/profile`,
        method: "PUT",
        body:data,
      })
    }),
    getUsers:builder.query({
      query: () => ({
        url: `${API_USER_URL}`,
      }),
      providesTags:['User'],
      keepUnusedDataFor:5,
    }),
    deleteUser:builder.mutation({
      query:userId=>({
        url:`${API_USER_URL}/${userId}`,
        method:"DELETE",
      })
    }),
    getUserById:builder.query({
      query:(id)=>({
        url:`${API_USER_URL}/${id}`,
      }),
      keepUnusedDataFor:5,
    }),
    updateUser : builder.mutation({
      query: data => ({
        url:`${API_USER_URL}/${data.userId}`,
        method:"PUT",
        body:data,
      }),
      invalidatesTags:["User"]
    })
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation ,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation
} = userApiSlice;

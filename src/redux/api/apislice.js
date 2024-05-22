import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL
const baseQuery = fetchBaseQuery({ 
  baseUrl: API_BASE_URL ,
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
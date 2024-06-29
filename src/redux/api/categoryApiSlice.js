import { apiSlice } from "./apislice";
const API_CATEGORY_URL = import.meta.env.VITE_CATEGORY_URL;

export const categoryApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory:builder.mutation({
            query:(newCategory)=>({
                url:`${API_CATEGORY_URL}`,
                method:"POST",
                body:newCategory
            })
        }),
        updateCategory:builder.mutation({
            query:({categoryId,updatedCategory})=>({
                url:`${API_CATEGORY_URL}/${categoryId}`,
                method:"PUT",
                body:updatedCategory
            })
        }),
        deleteCategory:builder.mutation({
            query:(categoryId)=>({
                url:`${API_CATEGORY_URL}/${categoryId}`,
                method:"DELETE"
            })
        }),
        getCategories:builder.query({
            query:()=>({
                url:`${API_CATEGORY_URL}/categories`,
            })
        })
    })
})

export const {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesQuery
}=categoryApiSlice
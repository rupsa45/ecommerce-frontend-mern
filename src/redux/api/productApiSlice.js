import {apiSlice} from './apislice'

const API_PRODUCT_URL = import.meta.env.VITE_PRODUCT_URL;


export const productApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getProducts:builder.query({
            query:({keyword})=>({
                url:`${API_PRODUCT_URL}`,
                params:{keyword},
            }),
            keepUnusedDataFor:5,
            providesTags:['Product'],
        }),
        getProductById:builder.query({
            query:(productId)=> `${API_PRODUCT_URL}/${productId}`,
            providesTags:(result,error,productId)=>[
                {type:'Product',id:productId},
            ]
        }),
        allProducts:builder.query({
            query:()=> `${API_PRODUCT_URL}/allproducts`
        }),
        getProductsDetails:builder.query({
            query:(productId)=> ({
                url:`${API_PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor:5,
        }),
        createProduct:builder.mutation({
            query:(productData)=> ({
                url:`${API_PRODUCT_URL}`,
                method:'POST',
                body:productData
            }),
            invalidatesTags:["Product"]
        }),
        updateProduct:builder.mutation({
            query:({productId,formData})=>({
                url:`${API_PRODUCT_URL}/${productId}`,
                method:'PUT',
                body:formData
            })
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${API_PRODUCT_URL}/${productId}`,
                method:'DELETE'
            }),
            providesTags:['Products']
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${API_PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data
            })
        }),
        getTopProducts:builder.query({
            query:()=>`${API_PRODUCT_URL}/top`,
        keepUnusedDataFor:5,
        }),
        getNewProducts:builder.query({
            query:()=>`${API_PRODUCT_URL}/new`,
            keepUnusedDataFor:5,
        }),
    })  

})

export const{
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductsDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetNewProductsQuery,
}=productApiSlice
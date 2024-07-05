import {apiSlice} from './apislice'

const API_ORDER_URL = import.meta.env.VITE_ORDER_URL;
const API_PAYPAL_URL = import.meta.env.VITE_PAYPAL_URL;

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query:(order)=>({
                url:API_ORDER_URL,
                method:'POST',
                body:order
            })
        }),
        getOrderDetails:builder.query({
            query:(id)=>({
                url:`${API_ORDER_URL}/${id}`
            })
        }),
        payOrder : builder.mutation({
            query:({orderId,details })=>({
                url:`${API_ORDER_URL}/${orderId}/pay`,
                method:'PUT',
                body:details
            })
        }),
        getPaypalClientId : builder.query({
            query:()=>({
                url: API_PAYPAL_URL
            })
        }),
        getMyOrders : builder.query({
            query:()=>({
                url: `${API_ORDER_URL}/mine`
            }),
            keepUnusedDataFor: 5
        }),
        getOrders:builder.query({
            query:()=> ({
                url:API_ORDER_URL
            })
        }),
        deliverOrder : builder.mutation({
            query:(orderId)=>({
                url: `${API_ORDER_URL}/${orderId}/deliver`,
                method:'PUT'
            })
        }),
        getTotalOrders: builder.query({
            query:()=> `${API_ORDER_URL}/total-orders`
        }),
        getTotalSales:builder.query({
            query:()=> `${API_ORDER_URL}/total-sales`
        }),
        getTotalSalesByDate: builder.query({
            query:()=> `${API_ORDER_URL}/total-sales-by-date`
        }),
    }),
})

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    useGetOrdersQuery
}= orderApiSlice
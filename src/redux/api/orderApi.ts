import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrderResponse, MessageResponse, NewOrderQuery, OrderDetailResponse, updateOrderQuery } from "../../types/api-types";


export const orderAPI = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/vi/order/` }),
    tagTypes:["order"],
    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse,NewOrderQuery>({
            query: (order) => ({
                url:"new",
                method:"POST",
                body:order,
            }),
            invalidatesTags:["order"]
        }),

        updateOrder: builder.mutation<MessageResponse,updateOrderQuery>({
            query: ({userId,orderID}) => ({
                url:`${orderID}?id=${userId}`,
                method:"PUT",
            }),
            invalidatesTags:["order"]
        }),

        deleteOrder: builder.mutation<MessageResponse,updateOrderQuery>({
            query: ({userId,orderID}) => ({
                url:`${orderID}?id=${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["order"]
        }),

        myOrder: builder.query<AllOrderResponse,string>({
            query: (id)=>`my?id=${id}`,
            providesTags:["order"]
        }),

        allOrder: builder.query<AllOrderResponse,string>({
            query: (id)=>`all?id=${id}`,
            providesTags:["order"]
        }),

        orderDetail: builder.query<OrderDetailResponse,string>({
            query: (id)=>id,
            providesTags:["order"]
        }),

    })
})

export const {
    useNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useAllOrderQuery,
    useMyOrderQuery,
    useOrderDetailQuery,
} = orderAPI
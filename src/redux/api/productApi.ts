import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryResponse, deleteProductQuery, MessageResponse, NewProductQuery, ProductDetailsResponse, ProductResponse, SearchProductQuery, SearchProductResponse, updateProductQuery } from "../../types/api-types";

export const productAPI= createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/vi/product/`}),
    tagTypes:["product"],
    endpoints:(builder)=>({

        latestProduct : builder.query<ProductResponse,string>({
            query: ()=> "latest",
            providesTags: ["product"],
        }),

        allProduct : builder.query<ProductResponse,string>({
            query: (id)=> `admin-product?id=${id}`,
            providesTags: ["product"],
        }),

        categories: builder.query<CategoryResponse,string>({
            query: ()=> "categories",
            providesTags: ["product"],
        }),

        searchProduct: builder.query<SearchProductResponse,SearchProductQuery>({
            query: ({search,sort,category,page,price})=>{
                let baseQuery="all?";

                if(search) baseQuery+=`search=${search}`;
                if(sort) baseQuery+=`&sort=${sort}`;
                if(category) baseQuery+=`&category=${category}`;
                if(page) baseQuery+=`&page=${page}`;
                if(price) baseQuery+=`&price=${price}`;

                return baseQuery
            },
            providesTags: ["product"],
        }),

        newProduct: builder.mutation<MessageResponse,NewProductQuery>({
            query: ({id,formdata})=>({
                url:`new?id=${id}`,
                method:"POST",
                body:formdata,
            }),
            invalidatesTags:["product"],
        }),

        productDetails: builder.query<ProductDetailsResponse,string>({
            query: (id)=>id,
            providesTags:["product"]
        }),

        updateProduct: builder.mutation<MessageResponse,updateProductQuery>({
            query: ({userId,productId,formdata})=>({
                url:`${productId}?id=${userId}`,
                method:"PUT",
                body:formdata,
            }),
            invalidatesTags:["product"],
        }),

        deleteProduct: builder.mutation<MessageResponse,deleteProductQuery>({
            query: ({userId,productId})=>({
                url:`${productId}?id=${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["product"],
        }),
    })
})

export const { useDeleteProductMutation, useUpdateProductMutation, useProductDetailsQuery, useLatestProductQuery, useAllProductQuery,useCategoriesQuery,useSearchProductQuery,useNewProductMutation}=productAPI
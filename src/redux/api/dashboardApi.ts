import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashboardAPI = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/vi/dashboard/` }),
    endpoints: (builder) => ({
        stats: builder.query<StatsResponse,string>({
            query: (id)=>`stats?id=${id}`,
        }),
        pie: builder.query<PieResponse,string>({
            query: (id)=>`pie?id=${id}`,
        }),
        bar: builder.query<BarResponse,string>({
            query: (id)=>`bar?id=${id}`,
        }),
        line: builder.query<LineResponse,string>({
            query: (id)=>`line?id=${id}`,
        }),
        
    })
})

export const {useStatsQuery,usePieQuery,useBarQuery,useLineQuery}= dashboardAPI;
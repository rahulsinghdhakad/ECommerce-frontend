import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CustomError, MessageResponse } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import moment from "moment";

interface ResType{
    data?: MessageResponse;
    error?:FetchBaseQueryError | SerializedError;
}

export const resToast = (res: ResType, navigate:NavigateFunction|null, url:string ) => {
    if (res.data) {
        toast.success(res.data.message);
        if(navigate) navigate(url)
    } else {
        toast.error((res.error as CustomError).data.message)
    }
}

export const getLastMonts=()=>{
    const currentDate= moment();
    currentDate.date(1);
    
    const last6Month=[];
    const last12Month=[];

    for(let i=0; i<6; i++){
        const monthDate= currentDate.clone().subtract(i,"month");
        const monthName= monthDate.format("MMMM");
        last6Month.unshift(monthName)
    }
    for(let i=0; i<12; i++){
        const monthDate= currentDate.clone().subtract(i,"month");
        const monthName= monthDate.format("MMMM");
        last12Month.unshift(monthName)
    }

    return {
        last6Month,
        last12Month
    }
}
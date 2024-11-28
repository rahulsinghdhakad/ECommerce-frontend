import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducers/userReducer";
import { productAPI } from "./api/productApi";
import { cartReducer } from "./reducers/cartReducer";
import { orderAPI } from "./api/orderApi";
import { dashboardAPI } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userAPI.middleware,
            productAPI.middleware,
            orderAPI.middleware,
            dashboardAPI.middleware,
        ]),
})

export type RootState=ReturnType<typeof store.getState>
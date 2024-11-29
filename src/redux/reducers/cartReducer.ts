import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    discount: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: 0,
    },
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex(i => i.productID === action.payload.productID);

            if (index === -1)
                state.cartItems.push(action.payload);
            else
                state.cartItems[index] = action.payload;

            state.loading = false;
        },

        deleteCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(i => i.productID !== action.payload);
            state.loading = false;
        },

        calculatePrice: (state) => {
            state.subtotal = state.cartItems.reduce((total, cur) =>
                (total + (cur.price * cur.quantity)), 0
            )
            state.tax = Math.round(state.subtotal * 0.3);
            state.shippingCharges = state.subtotal > 1000 ? 0 : (state.subtotal===0? 0:  500);
            state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
        },

        applyDiscount: (state,action:PayloadAction<number>)=>{
            state.discount=action.payload;
        },

        shippingInfoSet: (state,action:PayloadAction<ShippingInfo>)=>{
            state.shippingInfo=action.payload;
        },

        resetState: ()=>initialState,
    },
});

export const { addToCart,
     deleteCartItem,
     calculatePrice ,
      applyDiscount, 
      shippingInfoSet,
      resetState} = cartReducer.actions

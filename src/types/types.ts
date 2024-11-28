export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
    gender: string;
    dob: string;
}

export interface Product {
    _id: string,
    name: string,
    photo: string,
    price: number,
    stock: number,
    category: string,
}

export type CartItem = {
    name:string,
    price:number,
    photo:string,
    quantity:number,
    productID:string,
    stock:number,
}

export type ShippingInfo = {
    address:string,
    city:string,
    state:string,
    country:string,
    pinCode:number,
}

export type OrderItem = Omit<CartItem,"stock"> & {productID:string, _id:string}

export type Order= {
    shippingInfo: ShippingInfo,
    _id:string,
    user:{
        _id:string,
        name:string,
    },
    subTotal: number,
    shippingCharges: number,
    tax: number,
    total: number,
    discount: number,
    status:string,
    orderItems: OrderItem[],
}
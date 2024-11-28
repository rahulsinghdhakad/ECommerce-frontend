import { CartItem, Order, Product, ShippingInfo, User } from "./types";

export interface MessageResponse {
    success: boolean,
    message: string,
}

export interface UserResponse {
    success: boolean,
    user: User,
}

export interface ProductResponse {
    success: boolean,
    products: Product[],
}


export interface CustomError {
    status: number,
    data: {
        success: boolean,
        message: string,
    }
}

export interface CategoryResponse {
    success: boolean,
    categories: string[],
}

export interface SearchProductResponse extends ProductResponse {
    totalPages: number,
}

export interface SearchProductQuery {
    search?: string,
    sort?: string,
    category?: string,
    price?: string,
    page?: string,
}

export interface NewProductQuery {
    id: string,
    formdata: FormData,
}

export interface ProductDetailsResponse {
    success: boolean,
    product: Product,
}

export interface updateProductQuery {
    userId: string,
    productId: string,
    formdata: FormData,
}


export interface deleteProductQuery {
    userId: string,
    productId: string,
}


export interface NewOrderQuery {
    shippingInfo: ShippingInfo,
    user: string,
    subTotal: number,
    shippingCharges: number,
    tax: number,
    total: number,
    discount: number,
    orderItems: CartItem[],
}

export interface AllOrderResponse {
    success: boolean,
    orders: Order[],
}

export interface OrderDetailResponse {
    success: boolean,
    order: Order,
}

export interface updateOrderQuery {
    userId: string,
    orderID: string,
}

export interface AllUserResponse {
    success: boolean,
    users: User[],
}
export interface DeleteUserQuery {
    userID: string,
    adminUserID: string,
}

export type StatsResponse = {
    success: boolean,
    stats: Stats,
}

export type Stats = {
    categoryCount: Record<string, number>[],
    changePercentage: {
        revenue: number;
        product: number;
        user: number;
        order: number;
    },
    count: {
        revenue: number;
        product: number;
        user: number;
        order: number;
    },
    chart: {
        revenue: number[],
        order: number[],
    },
    UserRation: {
        male: number;
        female: number;
    },
    latestTransaction: {
        _id: string;
        status: "Processing" | "Shipped" | "Delivered";
        total: number;
        disconnect: number;
        orderItems: number;
    }[],
}

export type PieResponse = {
    success: boolean,
    charts: PieChart,
}

export type PieChart = {
    status: {
        processing: number;
        shipped: number;
        delivered: number;
    },
    categoryCount:Record<string, number>[],
    stockAvailability: {
        inStock: number;
        outStock: number;
    },
    revenueDistibution: {
        productionCost: number;
        discount: number;
        burnt: number;
        marketingCost: number;
        netMargin: number;
    },
    userAgeGroup: {
        teen: number;
        adult: number;
        old: number;
    },
    AdminCustomer: {
        admin: number;
        customer: number;
    },
}

export type BarResponse = {
    success: boolean,
    charts: BarChart,
}

export type BarChart={
    product: number[],
    user: number[],
    order: number[],
}

export type LineResponse = {
    success: boolean,
    charts: LineChart,
}

export type LineChart = {
    product: number[],
    user: number[],
    revenue: number[],
    discount: number[],
}
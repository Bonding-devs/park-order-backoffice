interface Order {
    date: string;
    count: number;
}

export const emptyOrdersData: OrdersData = {
    createdOrders: [],
    finishedOrders: [],
};

export interface OrdersData {
    createdOrders: Order[];
    finishedOrders: Order[];
}

export interface DataByRange {
    categories: string[];
    createdOrdersSeries: number[];
    finishedOrdersSeries: number[];
}
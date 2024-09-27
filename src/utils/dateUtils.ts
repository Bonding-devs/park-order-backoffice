import dayjs from "dayjs";
import { DataByRange, OrdersData } from "../models/orders-data";

export enum TimeRange {
    Day = 'Day',
    Week = 'Week',
    Month = 'Month'
}

const groupByWeek = (orders) => {
    return orders.reduce((acc, order) => {
        const week = dayjs(order.date).startOf('week').format('YYYY-MM-DD');
        if (!acc[week]) acc[week] = 0;
        acc[week] += order.count;
        return acc;
    }, {});
};

const groupByMonth = (orders) => {
    return orders.reduce((acc, order) => {
        const month = dayjs(order.date).startOf('month').format('YYYY-MM');
        if (!acc[month]) acc[month] = 0;
        acc[month] += order.count;
        return acc;
    }, {});
};


export const getDataByRange = (data: OrdersData, timeRange: TimeRange): DataByRange => {
    if (timeRange === TimeRange.Week) {
        const createdByWeek = groupByWeek(data.createdOrders);
        const finishedByWeek = groupByWeek(data.finishedOrders);
        const categories = Object.keys(createdByWeek);
        const createdOrdersSeries = categories.map(week => createdByWeek[week] || 0);
        const finishedOrdersSeries = categories.map(week => finishedByWeek[week] || 0);
        return { categories, createdOrdersSeries, finishedOrdersSeries };
    } else if (timeRange === TimeRange.Month) {
        const createdByMonth = groupByMonth(data.createdOrders);
        const finishedByMonth = groupByMonth(data.finishedOrders);

        const categories = Object.keys(createdByMonth);
        const createdOrdersSeries = categories.map(month => createdByMonth[month] || 0);
        const finishedOrdersSeries = categories.map(month => finishedByMonth[month] || 0);

        return { categories, createdOrdersSeries, finishedOrdersSeries };
    } else {
        const categories = Array.from(
            new Set([...data.createdOrders, ...data.finishedOrders].map(order => order.date))
        ).sort();

        const createdOrdersSeries = categories.map(date => {
            const found = data.createdOrders.find(order => order.date === date);
            return found ? found.count : 0;
        });

        const finishedOrdersSeries = categories.map(date => {
            const found = data.finishedOrders.find(order => order.date === date);
            return found ? found.count : 0;
        });

        return { categories, createdOrdersSeries, finishedOrdersSeries };
    }
};
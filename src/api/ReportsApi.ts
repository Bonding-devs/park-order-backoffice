import { HTTP_METHODS } from "../globals";
import { OrdersData } from "../models/orders-data";
import { createApiRequest } from "../services/axios";

interface DataWOReport {
    createdAtSince: Date | null;
    createdAtUntil: Date | null;
}

export const fetchWOReportSummary = async (params: DataWOReport): Promise<OrdersData> => {
    const url = '/api/v1/reports/work-orders/created-vs-finished';
    try {
        const response = await createApiRequest({
            url,
            method: HTTP_METHODS.GET,
            params,
        });
        console.log('Response fetch WO Report Summary:', response);
        return response
    } catch (error) {
        console.log('Error fetch WO Report Summary:', error);
        throw new Error(error);
    }
}
import { HTTP_METHODS } from "../globals";
import { LocationData } from "../models/locations-data";
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
        return response
    } catch (error) {
        console.log('Error fetch WO Report Summary:', error);
        throw new Error(error);
    }
}

export const fetchWOByLocation = async (params: DataWOReport): Promise<LocationData> => {
    const url = '/api/v1/reports/work-orders/by-location';
    try {
        const response = await createApiRequest({
            url,
            method: HTTP_METHODS.GET,
            params,
        });
        console.log('Response fetch WO By Location:', response);
        return response
    } catch (error) {
        console.log('Error fetch WO By Location:', error);
        throw new Error(error);
    }
}
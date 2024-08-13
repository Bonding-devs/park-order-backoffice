import { HTTP_METHODS } from "../globals";
import { Shift, ShiftsResponse } from "../models/shift";
import { ShiftApplication } from "../models/shiftApplication";
import { createApiRequest } from "../services/axios";

export const fetchOwnerShifts = async (startAtGtThan: string, startAtLsThan: string): Promise<ShiftsResponse> => {
    const url = `/api/v1/owners/shifts`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.GET,
                params: {
                    'startAtGtThan': startAtGtThan,
                    'startAtLsThan': startAtLsThan,
                },
            });
        return response;
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw error;
    }
};

export const fetchOwnerShiftDetail = async (shiftId: string): Promise<Shift> => {
    const url = `/api/v1/owners/shifts/${shiftId}`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.GET,
            });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching shift:', error);
        throw error;
    }
};

export const fetchOwnerShiftApplications = async (shiftId: string): Promise<ShiftApplication[]> => {
    const url = `/api/v1/shifts/${shiftId}/applications`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.GET,
            });
        return response.data;
    } catch (error) {
        console.error('Error fetching shift:', error);
        throw error;
    }
};

export const acceptOrRejectApplication = async (applicationId: string, actionTaken: string): Promise<boolean> => {
    const url = `/api/v1/shift-applications/${applicationId}/${actionTaken}`;
    try {
        await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.PUT,
            });
        return true;
    } catch (error) {
        console.error('Error fetching shift:', error);
        throw error;
    }
};

export const shiftApplicationDetails = async (applicationId: string): Promise<any> => {
    const url = `/api/v1/shift-applications/${applicationId}`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.GET,
            });
        return response;
    } catch (error) {
        console.error('Error fetching shift:', error);
        throw error;
    }
};
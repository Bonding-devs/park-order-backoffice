import { HTTP_METHODS } from "../globals";
import { PaymentMethodResponse } from "../models/paymentMethod";
import { createApiRequest } from "../services/axios";

export const fetchPaymentMethods = async (): Promise<PaymentMethodResponse> => {
    const url = `/api/v1/payment-methods`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.GET,
            });
        return response;
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        throw error;
    }
};

export const createSetupIntent = async () => {
    const url = `/api/v1/payments/create-setup-intent`;
    try {
        const response = await createApiRequest(
            {
                url: url,
                method: HTTP_METHODS.POST,
                data: {}
            });
        return response;
    } catch (error) {
        console.error('Error creating setup intent: ', error);
        throw error;
    }
};

import { HTTP_METHODS } from '../globals';
import { PaymentMethodResponse } from '../models/paymentMethod';
import { createApiRequest } from '../services/axios';

export const fetchContractorsReviews =
  async (): Promise<PaymentMethodResponse> => {
    const url = `api/v1/reviews`;
    try {
      const response = await createApiRequest({
        url: url,
        method: HTTP_METHODS.GET,
      });
      return response;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  };

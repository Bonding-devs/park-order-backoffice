import { WORK_ORDER_URL } from '../constant';
import { HTTP_METHODS } from '../globals';
/* ARREGLAR EL TYPE CUANDO SE SEPA LA ESTRUCTURA */
import { PaymentMethodResponse } from '../models/paymentMethod';
import { createApiRequest } from '../services/axios';

export const fetchWorkOrders = async (): Promise<any> => {
  const url = WORK_ORDER_URL.fetch;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
    });
    return response;
  } catch (error) {
    console.error('Error fetch Work Orders methods:', error);
    throw error;
  }
};

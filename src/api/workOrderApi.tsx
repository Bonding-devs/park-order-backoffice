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

export const createWorkOrders = async (
  data = {
    title: 'title must be a string 5',
    description: 'description must be a string',
    status: 'status must be a string',
    locationId: 'bf84be3a-5cd7-4b34-8d12-0896c9e99da3',
    categoryId: '4192b59b-6885-4cee-98fe-b8f0097e0557',
    issueId: 'b9a749c7-6349-4f80-a437-ed039c3b855e',
    priority: 'b9a749c7-6349-4f80-a437-ed039c3b855e',
    recurrence: 'none',
  }
): Promise<any> => {
  const url = WORK_ORDER_URL.create;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data: data,
    });
    return response;
  } catch (error) {
    console.error('Error create Work Orders methods:', error);
    throw error;
  }
};

import { WORK_ORDER_URL } from '../constant';
import { HTTP_METHODS } from '../globals';
/* ARREGLAR EL TYPE CUANDO SE SEPA LA ESTRUCTURA */
import { PaymentMethodResponse } from '../models/paymentMethod';
import { createApiRequest } from '../services/axios';

export const fetchWorkOrders = async (params): Promise<any> => {
  const url = WORK_ORDER_URL.Base;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
      params: params,
    });
    return response;
  } catch (error) {
    console.error('Error fetch Work Orders methods:', error);
    throw error;
  }
};

export const createWorkOrders = async (data): Promise<any> => {
  const { title, description, status } = data;
  const url = WORK_ORDER_URL.Base;
  debugger;
  const dataform = {
    title: title,
    description: description,
    status: status,
    locationId: 'bf84be3a-5cd7-4b34-8d12-0896c9e99da3',
    categoryId: '4192b59b-6885-4cee-98fe-b8f0097e0557',
    issueId: 'b9a749c7-6349-4f80-a437-ed039c3b855e',
    priority: 'b9a749c7-6349-4f80-a437-ed039c3b855e',
    recurrence: 'none',
  };
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data: dataform,
    });
    return response;
  } catch (error) {
    console.error('Error create Work Orders methods:', error);
    throw error;
  }
};

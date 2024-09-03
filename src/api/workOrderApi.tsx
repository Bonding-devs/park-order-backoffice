import { WORK_ORDER_URL } from '../constant';
import { HTTP_METHODS } from '../globals';
/* ARREGLAR EL TYPE CUANDO SE SEPA LA ESTRUCTURA */

import { createApiRequest } from '../services/axios';

export const fetchWorkOrders = async (params): Promise<any> => {
  try {
    const response = await createApiRequest({
      url: WORK_ORDER_URL.Base,
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
  const { title, description, status, priority, scheduledDate } = data;

  const dataform = {
    title,
    description,
    status,
    locationId: 'aed5004c-2672-4eca-b2a4-8bc0f50bf867',
    categoryId: '0dc85fb7-b048-4760-92c9-ffc2ee37938f',
    issueId: '29ccfebf-2c20-4aa7-bb17-b4e749c3e38a',
    priority,
    recurrence: 'none',
    scheduledDate: new Date(scheduledDate),
  };

  try {
    const response = await createApiRequest({
      url: WORK_ORDER_URL.Base,
      method: HTTP_METHODS.POST,
      data: dataform,
    });
    return response;
  } catch (error) {
    console.error('Error create Work Orders methods:', error);
    throw error;
  }
};

export const getWorkOrderById = async ({ id }): Promise<any> => {
  const url = `${WORK_ORDER_URL.Base}/${id}`;
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

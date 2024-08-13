import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "../services/axios";

export const getLocations = async () => {
  const url = '/api/v1/locations?limit=50';

  try {
    const response = await createApiRequest({ url: url, method: HTTP_METHODS.GET })
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const createLocation = async (city, address) => {
  const url = '/api/v1/locations';
  const data = { city, address };

  try {
    const response = await createApiRequest({ url: url, method: HTTP_METHODS.POST, data: data });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

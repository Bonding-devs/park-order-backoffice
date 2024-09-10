import { HTTP_METHODS } from '../globals';
import { CreateLocation } from '../models/location-model';
import { createApiRequest } from '../services/axios';

interface LocationsParams {
  offset: number;
  limit: number;
}

export const fetchLocations = async (
  params?: LocationsParams
): Promise<any> => {
  const url = '/api/v1/locations';
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
      params: params,
    });
    return response;
  } catch (error) {
    console.error('Error fetch Locations methods:', error);
    throw error;
  }
};

export const createLocation = async (data: CreateLocation): Promise<any> => {
  const url = '/api/v1/locations';
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data,
    });
    return response;
  } catch (error) {
    console.error('Error Creating Location:', error);
    throw 'Error Creating Location';
  }
};

export const updateLocation = async (locationId:string ,data: CreateLocation): Promise<any> => {
  const url = `/api/v1/locations/${locationId}`;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.PUT,
      data,
    });
    return response;
  } catch (error) {
    console.error('Error Updating Location:', error);
    throw 'Error Updating Location';
  }
};

export const fetchQrCode = async (locationId: string): Promise<string> => {
  const url = `/api/v1/locations/${locationId}/qrcode`;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
    });
    return response.qrCode; 
  } catch (error) {
    console.error('Error Getting QrCode:', error);
    throw 'Error Getting QrCode';
  }
};

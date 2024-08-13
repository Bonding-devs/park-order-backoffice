import { HTTP_METHODS } from '../globals';
import { createApiRequest } from '../services/axios';

export const getContractorApplications = async (status: String) => {
  const url = '/api/v1/contractor-applications';

  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
      params: {
        status: status,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching contractor applications:', error);
    throw error;
  }
};

export const acceptOrRejectContractorApplication = async (
  contractorId: string,
  actionTaken: string
): Promise<boolean> => {
  const url = `/api/v1/contractor-applications/${contractorId}/${actionTaken}`;
  try {
    await createApiRequest({
      url: url,
      method: HTTP_METHODS.PUT,
    });
    return true;
  } catch (error) {
    console.error('Error fetching shift:', error);
    throw error;
  }
};

export const getOrganizations = async (page: number) => {
  const url = '/api/v1/organizations';

  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
      params: { page: page },
    });
    return response;
  } catch (error) {
    console.error('Error fetching contractor applications:', error);
    throw error;
  }
};

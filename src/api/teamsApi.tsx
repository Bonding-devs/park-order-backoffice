import { TEAMS_URL } from '../constant';
import { HTTP_METHODS } from '../globals';
import { createApiRequest } from '../services/axios';

export const fetchTeams = async (params): Promise<any> => {
  try {
    const response = await createApiRequest({
      url: TEAMS_URL.BASE,
      method: HTTP_METHODS.GET,
      params: params,
    });
    return response;
  } catch (error) {
    console.error('Error fetch Team methods:', error);
    throw error;
  }
};

import { HTTP_METHODS } from "../globals";
import { Params } from "../models/params";
import { Team, TeamWithoutUsers } from "../models/team";
import { createApiRequest } from "../services/axios";

const url = '/api/v1/teams';

export const fetchAllTeams = async (): Promise<TeamWithoutUsers[]> => {
    try {
        const response = await createApiRequest({
            url: url,
            method: HTTP_METHODS.GET,
            params: {
                limit: 100
            },
        }) as TeamWithoutUsers[];
        return response;
    } catch (error) {
        console.error('Error fetch Locations methods:', error);
        throw error;
    }
}

export const fetchTeams = async (
  params?: Params
): Promise<Team[]> => {
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
      params: params,
    });
    return response;
  } catch (error) {
    console.log('Error fetch Teams methods:', error);
    throw error;
  }
};
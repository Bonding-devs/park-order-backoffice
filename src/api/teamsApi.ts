import { HTTP_METHODS } from "../globals";
import { TeamWithoutUsers } from "../models/team";
import { createApiRequest } from "../services/axios";

export const fetchAllTeams = async (): Promise<TeamWithoutUsers[]> => {
    const url = '/api/v1/teams';
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
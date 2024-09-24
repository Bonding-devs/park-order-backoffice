import { HTTP_METHODS } from "../globals";
import { Params } from "../models/params";
import { CreateTeam, Team, TeamWithoutUsers } from "../models/team";
import { createApiRequest } from "../services/axios";
import { delay } from "../utils/delay";

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

export const fetchTeamById = async (id: string): Promise<Team> => { 
  try {
    const response = await createApiRequest({
      url: `${url}/${id}`,
      method: HTTP_METHODS.GET,
    });
    return response;
  } catch (error) {
    console.error('Error fetch Team by id:', error);
    throw error;
  }
}

export const addUsersToTeam = async (teamId: string, userIds: string[]): Promise<Team> => {
  try {
    // await createApiRequest({
    //   url: `${url}/${teamId}/users`,
    //   method: HTTP_METHODS.POST,
    //   data: userIds,
    // });
    await delay(3000);
    return await fetchTeamById(teamId);
  } catch (error) {
    console.error('Error add users to team:', error);
    throw error;
  }
}

export const removeUsersFromTeam = async (teamId: string, userIds: string[]): Promise<Team> => {
  try {
    // await createApiRequest({
    //   url: `${url}/${teamId}/users`,
    //   method: HTTP_METHODS.DELETE,
    //   data: userIds,
    // });
    await delay(3000);
    return await fetchTeamById(teamId);
  } catch (error) {
    console.error('Error remove users from team:', error);
    throw error;
  }
}

export const deleteTeam = async (teamId: string): Promise<void> => {
  try {
    await createApiRequest({
      url: `${url}/${teamId}`,
      method: HTTP_METHODS.DELETE,
    });
  } catch (error) {
    console.error('Error delete team:', error);
    throw error;
  }
}

export const createTeam = async (team: CreateTeam): Promise<Team> => {
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data: team,
    });
    return await fetchTeamById(response.id);
  } catch (error) {
    console.error('Error create team:', error);
    throw error;
  }
}

export const updateTeam = async (id: string,data: CreateTeam): Promise<Team> => {
  try {
    await createApiRequest({
      url: `${url}/${id}`,
      method: HTTP_METHODS.PUT,
      data
    });
    return await fetchTeamById(id);
  } catch (error) {
    console.error('Error update team:', error);
    throw error;
  }
}
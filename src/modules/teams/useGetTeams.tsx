import { useGetData } from '../useGetData';
import { Team } from '../../models/team';
import { Params } from '../../models/params';
import { fetchTeams } from '../../api/teamsApi';
import { DataFetchResult } from '../../models/data-fetch-result';

const getTeams = async (params: Params): Promise<{ data: Team[] }> => {
  const response = await fetchTeams(params);
  return {
    data: response,
  };
};

export const useGetTeams = (): DataFetchResult<Team> => {
  const methods = useGetData<Team>(getTeams, 10, 'teams');
  return methods;
};

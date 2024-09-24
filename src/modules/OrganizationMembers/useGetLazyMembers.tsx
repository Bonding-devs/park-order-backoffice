import { useState } from 'react';
import { fetchOrganizationMembers } from '../../api/organizationMembersApi';
import { OrganizationMember } from '../../models/organization-member';
import { useGetAllData } from '../useGetAllData';
import { useAuth } from '../../context/AuthContext';

const getTeams = async (
  id: string
): Promise<{ data: OrganizationMember[] }> => {
  const response = await fetchOrganizationMembers(id);
  return {
    data: response,
  };
};

export const useGetLazyMembers = () => {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const { data, error, getData, isLoading,} = useGetAllData(
    getTeams,
    'members',
    user.organizationId
  );

  const loadData = (force: boolean = false) => {
    if (force || !loaded) {
      getData();
      setLoaded(true);
    }
  };

  return {
    members: data,
    isLoading,
    error,
    loadData,
  };
};

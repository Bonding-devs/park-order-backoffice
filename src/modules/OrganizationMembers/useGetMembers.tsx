import { useEffect, useState } from 'react';
import { fetchOrganizationMembers } from '../../api/organizationMembersApi';
import { useAuth } from '../../context/AuthContext';
import { OrganizationMember } from '../../models/organization-member';
import { useOrganizationMember } from '../../context/OrganizationMemberContext';

export const useGetMembers = () => {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { load, setLoad} = useOrganizationMember();
  
  const getMembers = async (): Promise<void> => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchOrganizationMembers(user.organizationId);
      setMembers(response);
    } catch (error) {
      console.error('Error Getting Members:', error);
      setError('Error Getting Members');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (load) {
      getMembers();
      setLoad(false);
    }
  }, [load]);

  useEffect(() => {
    getMembers();
  }, []);

  return {
    members,
    loading,
    error,
    setError,
  };
};

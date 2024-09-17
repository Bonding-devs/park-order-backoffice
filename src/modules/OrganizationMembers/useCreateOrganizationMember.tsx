import { useState } from 'react';
import { CreateOrganizationMember } from '../../models/organization-member';
import { createOrganizationMember } from '../../api/organizationMembersApi';
import { useOrganizationMember } from '../../context/OrganizationMemberContext';
import { useForm } from 'react-hook-form';

export const useCreateOrganizationMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setInvite, setLoad } = useOrganizationMember();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerMember = async (member: CreateOrganizationMember) => {
    setLoading(true);
    try {
      await createOrganizationMember(member);
      setLoad(true);
      setInvite(false);
      reset();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    registerMember,
    loading,
    error,
    setError,
    register,
    handleSubmit,
    errors
  };
};

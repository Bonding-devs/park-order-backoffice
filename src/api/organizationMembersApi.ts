import { HTTP_METHODS } from "../globals";
import { CreateOrganizationMember, OrganizationMember } from '../models/organization-member';
import { createApiRequest } from "../services/axios";

export const fetchOrganizationMembers = async (organizationId: string): Promise<OrganizationMember[]> => {
  const url = `/api/v1/organizations/${organizationId}/users`;
  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.GET,
    });    
    return response;
  } catch (error) {
    console.error('Error fetch Organization Members:', error);
    throw error;
  }
}

export const createOrganizationMember = async ( member: CreateOrganizationMember): Promise<void> => {
  const url = '/api/v1/auth/register/organization-member';
  try {
     await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data: member,
    });
  } catch (error) {
    console.error('Error Creating Organization Member:', error);
    throw error;
  }
}
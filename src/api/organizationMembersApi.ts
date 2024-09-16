import { HTTP_METHODS } from "../globals";
import { OrganizationMember } from "../models/organization-member";
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
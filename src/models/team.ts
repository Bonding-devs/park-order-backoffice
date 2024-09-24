import { OrganizationMember } from "./organization-member";
export interface TeamWithoutUsers {
    id: string;
    name: string;
}

export interface Team {
    id: string;
    name: string;
    description: string;
    users: OrganizationMember[];
}

export interface CreateTeam {
    name: string;
    description: string;
}
import { Photo } from "./photo";
import { Role } from "./role";
export interface OrganizationMember {
    id: string;
    firstName: string;
    lastName: string;
    photo: Photo;
    role: Role;
  }
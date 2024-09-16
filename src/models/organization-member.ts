interface Photo {
    id: string;
    path: string;
  }
  
  interface Role {
    id: number;
    name: string;
  }
  
export interface OrganizationMember {
    id: string;
    firstName: string;
    lastName: string;
    photo: Photo;
    role: Role;
  }
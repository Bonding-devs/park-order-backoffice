export interface Photo {
  id: string;
  path: string;
}

export interface Organization {
  id: string;
}

export interface TeamInCharge {
  id: string;
}

export interface LocationModel {
  id: string;
  name: string;
  address: string;
  description: string;
  qrCode: string;
  photo: Photo;
  organization: Organization;
  teamInCharge: TeamInCharge;
  createdAt: string;
}

import { Photo } from "./photo";

export interface Organization {
  id: string;
}

export interface TeamInCharge {
  id: string;
  name: string;
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


export interface CreateLocation {
  name: string;
  address: string;
  description: string;
  photoId: string;
  teamInChargeId: string;
}
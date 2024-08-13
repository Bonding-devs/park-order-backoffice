import { Photo } from "./photo";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    emailVerified: boolean;
    photo: Photo;
}
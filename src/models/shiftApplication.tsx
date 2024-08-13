import { User } from "./user";

export interface ShiftApplication {
    id: string;
    offer: string;
    status: string;
    user: User;
    type: string;
}
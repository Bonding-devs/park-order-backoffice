import { Location } from "./location";
import { Organization } from "./organization";
import { User } from "./user";

export interface Shift {
    id: string;
    startAt: string;
    endAt: string;
    hourlyRate: number;
    totalRate: number;
    status: string;
    location: Location;
    organization: Organization;
    applicationCount: number;
    assignedUser: User;
}

export interface ShiftsResponse {
    data: Shift[];
    hasNextPage: boolean;
}

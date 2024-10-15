
interface Location {
    locationName: string;
    count: number;
}
export interface LocationData{
    locations: Location[];
}

export const emptyLocationsData: LocationData = {
    locations: [],
}
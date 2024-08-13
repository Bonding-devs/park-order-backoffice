export enum SliceStatus {
    IDLE = "IDLE",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken'
};
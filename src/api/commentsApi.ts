import { HTTP_METHODS } from "../globals";
import { CreateComment } from "../models/comment";
import { createApiRequest } from "../services/axios";

export const createComment = async (data: CreateComment): Promise<void> => {
    const url = '/api/v1/comments';
    try {
        const response = await createApiRequest({
            url: url,
            method: HTTP_METHODS.POST,
            data,
        });
        return response;
    } catch (error) {
        console.error('Error Creating Comment:', error);
        throw 'Error Creating Comment';
    }
};
import { HTTP_METHODS } from "../globals";
import { CommentModel, CreateComment } from "../models/comment";
import { createApiRequest } from "../services/axios";

export interface FetchCommentsParams {
    workOrderId: string;
    offset: number;
    limit: number;
}

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

export const fetchComments = async (params: FetchCommentsParams): Promise<CommentModel[]> => {
    const url = `/api/v1/comments`;
    try {
        const response = await createApiRequest({
            url: url,
            method: HTTP_METHODS.GET,
            params,
        });
        return response;
    } catch (error) {
        console.error('Error Getting Comments:', error);
        throw 'Error Getting Comments';
    }
}
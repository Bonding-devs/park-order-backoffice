import { BasicUser } from "./user";

export interface CreateComment {
    text: string;
    userId: string;
    workOrderId: string;
}
  
export interface CommentModel {
    id: string;
    user: BasicUser;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
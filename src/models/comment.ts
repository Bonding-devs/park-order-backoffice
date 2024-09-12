
export interface CreateComment {
    text: string;
    userId: string;
    workOrderId: string;
}

interface Photo {
    id: string;
    path: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    photo: Photo;
}
  
export interface CommentModel {
    id: string;
    user: User;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
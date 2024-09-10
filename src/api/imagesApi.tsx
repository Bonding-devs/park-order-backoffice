import { AxiosProgressEvent, CancelTokenSource } from 'axios';
import { HTTP_METHODS } from '../globals';
import { createApiRequest } from '../services/axios';

export const uploadImage = async ({
  file,
  setUploadProgress,
  cancelTokenSource,
}: {
  file: File;
  setUploadProgress?: (progress: number) => void;
  cancelTokenSource?: CancelTokenSource;
}) => {
  const url = '/api/v1/files/upload';
  const data = new FormData();
  data.append('file', file);
  try {  
    const response = await createApiRequest({
      method: HTTP_METHODS.POST,
      url,
      data,
      onUploadProgress: setUploadProgress
        ? (progressEvent: AxiosProgressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        : null,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      cancelToken: cancelTokenSource?.token, 
    });

    return response.file;
  } catch (error) {
    console.error('Error Upload Image:', error);
    throw error;
  }
};

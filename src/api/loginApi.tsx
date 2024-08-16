import { AUTH_URL } from "../constant";
import { HTTP_METHODS, STORAGE_KEYS } from "../globals";
import { createApiRequest } from "../services/axios";

export const loginApi = async (email, password) => {
  const url = AUTH_URL.LOGIN;
  const data = { email, password };

  try {
    const response = await createApiRequest({
      url: url,
      method: HTTP_METHODS.POST,
      data: data
    });
    const { token, refreshToken } = response;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
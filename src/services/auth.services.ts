import { AxiosError } from "axios";
import { methodsApi } from "../api";

export interface LoginResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}


export class AuthService {

  static readonly login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const { data } = await methodsApi.post<LoginResponse>('/auth/login', {
        email,
        password
      });
      return data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.error('Error -> ', error);
      throw new Error("Error -> Unable to login");
    }
  };

  static readonly checkAuthStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await methodsApi.get<LoginResponse>(
        "/auth/check-status"
      );
      return data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.error('Error -> ', error);
      throw new Error("Error -> UnAuthorized");
    }
  };

  static readonly infoAuthPrivate = async (): Promise<unknown> => {
    try {
      const { data } = await methodsApi.get<unknown>(
        "/auth/private"
      );
      return data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data);
      }
      console.error('Error -> ', error);
      throw new Error("Error -> UnAuthorized");
    }
  };
};

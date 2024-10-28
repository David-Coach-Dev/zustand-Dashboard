import type { User } from "../../../interface";

export interface AuthState {
  //properties
  status: AuthStatus;
  token?: string;
  user?: User;
  //methods
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  checkAuthStatus: () => Promise<void>;
  getUserFullName: () => string;
  getAuthToken: () => string;
}

export type AuthStatus = "pending" | "authorized" | "unauthorized";

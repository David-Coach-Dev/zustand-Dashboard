
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthState } from "../interface/Auth.interface";
import { customSessionStorage } from "../../storages/session.storage";
import { AuthService } from "../../../services/auth.services";

const storeApi: StateCreator<AuthState, [["zustand/devtools", never]]> = (
  set, get
) => ({
  //properties
  status: "pending",
  token: undefined,
  user: undefined,
  //methods
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw new Error('unauthorized');
    }
  },

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkAuthStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      //throw new Error('unauthorized');
    }
  },

  getUserFullName: () => {
    const { user } = get();
    if (!user) return "User no found";
    return user.fullName;
  },

  getAuthToken: () => {
    const { token } = get();
    if (!token) return "Token no found";
    return token;
  }
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: "Auth-Store",
      storage: customSessionStorage,
      //storage: fireBaseStorage,
    })
  )
);

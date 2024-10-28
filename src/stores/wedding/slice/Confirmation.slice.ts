import { StateCreator } from "zustand";
import { ConfirmationSlice } from "../interface/Confirmation.interface";

export const createConfirmationSlice: StateCreator<
  ConfirmationSlice,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set, get) => ({
  //properties
  isConfirmed: false,
  //methods
  setIsConfirmed: (confirmation: boolean) => {
    set({ isConfirmed: confirmation }, false, "setConfirmed");
  },
  getIsConfirmed: () => get().isConfirmed,
});

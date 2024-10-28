import { StateCreator } from "zustand";
import { GuestSlice } from "../interface/Guest.interface";


export const createGuestSlice: StateCreator<
  GuestSlice,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set) => ({
  //properties
  guestsCount: 0,
  //methods
  setGuestsCount: (guestsCount: number) => {
    if (guestsCount < 0) return;
    set({ guestsCount }, false, "setGuestsCount");
  },
});

import { StateCreator } from "zustand";
import { PersonSlice } from "../interface/Person.interface";

export const createPersonSlice: StateCreator<
  PersonSlice,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set) => ({
  //properties
  firstName: "",
  lastName: "",
  //methods
  setFirstName: (firstName: string) =>
    set({ firstName }, false, "setFirstName"),
  setLastName: (lastName: string) =>
    set({ lastName }, false, "setLastName"),
});

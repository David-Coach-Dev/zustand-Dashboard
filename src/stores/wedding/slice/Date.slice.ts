import { StateCreator } from "zustand";
import { DataSlice } from "../interface/Date.interface";

export const createDateSlice: StateCreator<
  DataSlice,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set, get) => ({
  //properties
  eventDate: new Date(),
  //methods
  getEventDate: () => {
    const date = get().eventDate;
    const setDate = new Date(date).toISOString().split("T")[0];
    console.debug(`Get Event Date -> ${setDate}.`);
    return setDate;
  },

  getEventTime: () => {
    const setDate = new Date(get().eventDate);
    const setHours = setDate.getHours().toString().padStart(2, "0");
    const setMinutes = setDate.getMinutes().toString().padStart(2, "0");
    console.debug(`Get Event Time -> ${setHours} : ${setMinutes}.`);
    return `${setHours}:${setMinutes}`;
  },

  setEventDate: (parcialDate: string) => set ((state)=>{
    const date = new Date(parcialDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()+1;
    const newDate = new Date(state.eventDate);
    newDate.setFullYear(year, month, day);
    console.debug(`Set Event Date -> ${newDate}.`);
    return {eventDate: newDate};
  }),

  setEventTime: (time: string) => set ((state)=>{
    const hours = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);
    const newDate = new Date(state.eventDate);
    newDate.setHours(hours, minutes, 0, 0);
    console.debug(`Set Event Time -> ${newDate}.`);
    return {eventDate: newDate};
  })
});

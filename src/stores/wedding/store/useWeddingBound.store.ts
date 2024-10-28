import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { customSessionStorage } from "../../storages/session.storage";

import { PersonSlice } from "../interface/Person.interface";
import { GuestSlice } from "../interface/Guest.interface";
import { DataSlice } from "../interface/Date.interface";

import { createPersonSlice } from "../slice/Person.slice";
import { createGuestSlice } from "../slice/Guest.slice";
import { createDateSlice } from "../slice/Date.slice";
import { ConfirmationSlice } from "../interface/Confirmation.interface";
import { createConfirmationSlice } from "../slice/Confirmation.slice";



type ShareState = PersonSlice & GuestSlice & DataSlice & ConfirmationSlice ;

export const useWeddingBoundStore = create<ShareState>()(
  devtools(
    persist(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlice(...a),
      }),
      {
        name: "weddingStore",
        storage: customSessionStorage,
      }
    )
  )
);

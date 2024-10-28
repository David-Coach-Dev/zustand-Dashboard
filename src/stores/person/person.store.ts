import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";
import { useWeddingBoundStore } from "../wedding/store/useWeddingBound.store";
//import { fireBaseStorage } from "../storages/firebase.storage copy";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface ActionsPerson {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

const storeApi: StateCreator<
  PersonState & ActionsPerson,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & ActionsPerson>()(
  devtools(
    persist(storeApi, {
      name: "personStore",
      storage: customSessionStorage,
      //storage: fireBaseStorage,
    })
  )
);

usePersonStore.subscribe(
  (nextState, prevState) => {
    if (nextState.firstName !== prevState.firstName) {
      useWeddingBoundStore.getState().setFirstName(nextState.firstName);
    };

    if (nextState.lastName !== prevState.lastName) {
      useWeddingBoundStore.getState().setLastName(nextState.lastName);
    };
  }
);

import { createJSONStorage, StateStorage } from "zustand/middleware";
const fireBaseUrl = "https://zustandfh-default-rtdb.firebaseio.com/zustand";

const firebaseStorageApi: StateStorage = {
  getItem: async(name: string):Promise<string | null>  => {
    try {
      const data = await fetch(`${fireBaseUrl}/${name}.json`)
        .then(
          (res) => res.json()
        );
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
      throw error;
    }
  },

  setItem:async(name: string, value: string): Promise<void> => {
    try {
      const data = await fetch(`${fireBaseUrl}/${name}.json`, {
        method: "PUT",
        body: value,
      }).then((res) =>
        res.json()
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      throw error;
    }
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};
export const fireBaseStorage = createJSONStorage(() => firebaseStorageApi);

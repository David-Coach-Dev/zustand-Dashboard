import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Bear {
  // Proprieties
  id: number;
  name: string;
  // Methods
}

interface BearState {
  // Proprieties
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bears: Bear[];

  totalBears: () => number;

  // Methods
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  removeAllBlackBears: () => void;
  removeAllPolarBears: () => void;
  removeAllPanadaBears: () => void;
  updateBlackBears: (newBears: number) => void;
  updatePolarBears: (newBears: number) => void;
  updatePandaBears: (newBears: number) => void;
  doNothing: () => void;
  addBear: () => void;
  removeBear: (id: number) => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set, get) => ({
        blackBears: 10,
        polarBears: 5,
        pandaBears: 1,

        bears: [{ id: 1, name: "Oso #1" }],

        totalBears: () => {
          return (
            get().blackBears +
            get().polarBears +
            get().pandaBears +
            get().bears.length
          );
        },

        addBear: () =>
          set((state) => ({
            bears: [
              ...state.bears,
              {
                id: state.bears.length + 1,
                name: `Bear ${state.bears.length + 1}`,
              },
            ],
          })),
        removeBear: (value: number) =>
          set((state) => ({
            bears:
              state.bears.length !== 1
                ? state.bears.filter((bear) => bear.id !== value)
                : [],
          })),
        clearBears: () => set({ bears: [] }),
        increaseBlackBears: (by: number) =>
          set((state) => ({ blackBears: state.blackBears + by })),
        increasePolarBears: (by: number) =>
          set((state) => ({ polarBears: state.polarBears + by })),
        increasePandaBears: (by: number) =>
          set((state) => ({ pandaBears: state.pandaBears + by })),
        removeAllBlackBears: () => set({ blackBears: 0 }),
        removeAllPolarBears: () => set({ polarBears: 0 }),
        removeAllPanadaBears: () => set({ pandaBears: 0 }),
        updateBlackBears: (newBlackBears) => set({ blackBears: newBlackBears }),
        updatePolarBears: (newPolarBears) => set({ polarBears: newPolarBears }),
        updatePandaBears: (newPandaBears) => set({ pandaBears: newPandaBears }),
        doNothing: () => set((state) => ({ bears: [...state.bears] })),
      }),
      { name: "bearsStore" }
    )
  )
);

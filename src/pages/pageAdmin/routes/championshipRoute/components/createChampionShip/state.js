import { create } from "zustand";

const useFormCT = create((set) => ({
  componentCT: false,
  setComponentCT: (componentCT) => set({ componentCT }),
}));

export default useFormCT;

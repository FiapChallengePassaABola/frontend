import { create } from "zustand";

const useAiSummary = create((set) => ({
  aiSummary: "",
  addText: (text) => set(() => ({ aiSummary: text })),
  removeSummary: () => set({ aiSummary: "" }),
}));

export default useAiSummary;

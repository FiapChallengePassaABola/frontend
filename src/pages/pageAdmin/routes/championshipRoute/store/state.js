import {create} from 'zustand';

const useButton = create((set) => ({
  componentState: false,
  componentChange: (newState) => set({ componentState: newState }),
}));

export default useButton

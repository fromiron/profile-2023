import { create } from "zustand";

interface FirstVisitStore {
  isFirstVisit: boolean;
  checkFirstVisit: () => void;
}

const useFirstVisitStore = create<FirstVisitStore>((set) => ({
  isFirstVisit: false,
  checkFirstVisit: () => {
    const visitedBefore = localStorage.getItem("visitedBefore");
    if (!visitedBefore) {
      set({ isFirstVisit: true });
      localStorage.setItem("visitedBefore", "true");
    }
  },
}));

export default useFirstVisitStore;

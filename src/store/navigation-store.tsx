import { create } from "zustand";

const urls = ["/", "/about", "/work", "/contact"] as const;
export type NavMenu = (typeof urls)[number];
interface NavigationStoreState {
  activeLink: NavMenu;
  setActiveLink: (url: NavMenu) => void;
}

const useNavigationStore = create<NavigationStoreState>((set) => ({
  activeLink: "/",
  setActiveLink: (url) => set(() => ({ activeLink: url })),
}));

export default useNavigationStore;

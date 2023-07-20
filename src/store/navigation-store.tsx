import { create } from "zustand";

interface NavItem {
  text: string;
  url: string;
}
const navItems: NavItem[] = [
  { text: "top", url: "/#top" },
  { text: "about", url: "/#about" },
  { text: "work", url: "/#work" },
  { text: "hire me!", url: "/#contact" },
];

const urls = navItems.map((item) => item.url);
export type NavMenu = (typeof urls)[number];
interface NavigationStoreState {
  activeLink: NavMenu;
  setActiveLink: (url: NavMenu) => void;
  navItems: typeof navItems;
}

const useNavigationStore = create<NavigationStoreState>((set) => ({
  activeLink: "/#top",
  setActiveLink: (url) => set(() => ({ activeLink: url })),
  navItems,
}));

export default useNavigationStore;

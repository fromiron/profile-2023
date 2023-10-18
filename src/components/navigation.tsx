"use client";

import useFirstVisitStore from "@/store/first-visit-store";
import useNavigationStore, { NavMenu } from "@/store/navigation-store";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ScrollAnchor from "./scroll-anchor";

const Navigation = () => {
  const { activeLink, navItems } = useNavigationStore();
  const { checkFirstVisit } = useFirstVisitStore();

  useEffect(() => {
    checkFirstVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navContainerRef = useRef<HTMLUListElement | null>(null);
  const [accWidth, setAccWidth] = useState(0);

  useLayoutEffect(() => {
    function findUrlIndex(url: NavMenu) {
      return navItems.findIndex((item) => item.url === url) + 1;
    }
    if (navContainerRef.current) {
      const parentLeft = navContainerRef.current.getBoundingClientRect().left;
      const index = findUrlIndex(activeLink);

      const childLeft =
        navContainerRef.current.children[index].getBoundingClientRect().right;

      const width = childLeft - parentLeft + 10;
      setAccWidth(width);
    }
  }, [activeLink, navItems]);

  return (
    <ul className="relative flex gap-x-4 lg:gap-x-8" ref={navContainerRef}>
      <motion.div
        id="nav-acc"
        className="absolute bottom-[40%] flex h-[1px] bg-primary"
        initial={false}
        animate={{ width: accWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="absolute -top-[2px] right-0 h-[5px] w-[5px] rounded-full bg-primary" />
      </motion.div>
      {navItems.map((item) => (
        <NavItem
          key={item.text}
          text={item.text}
          selected={activeLink === item.url}
          url={item.url as NavMenu}
        />
      ))}
    </ul>
  );
};

const NavItem = ({
  text,
  selected,
  url,
}: {
  text: string;
  selected: boolean;
  url: NavMenu;
}) => {
  return (
    <li>
      <ScrollAnchor
        elID={url.replace("/#", "")}
        className={`cursor-pointer text-xl transition-all duration-500 ${
          selected ? "font-medium text-primary" : ""
        } select-none hover:text-primary`}
      >
        {text}
      </ScrollAnchor>
    </li>
  );
};

export default Navigation;

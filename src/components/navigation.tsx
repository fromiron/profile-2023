"use client";

import useNavigationStore, { NavMenu } from "@/store/navigation-store";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const Navigation = () => {
  const { activeLink, navItems } = useNavigationStore();
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
    <ul className="flex relative gap-x-8" ref={navContainerRef}>
      <motion.div
        id="nav-acc"
        className="absolute flex bottom-[40%] h-[1px] bg-primary"
        initial={false}
        animate={{ width: accWidth }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="absolute right-0 -top-[2px] h-[5px] w-[5px] rounded-full bg-primary" />{" "}
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
      <a href={url} className={`transition-all duration-500 ${selected ? "font-semibold" : ""}`}>
        {text}
      </a>
    </li>
  );
};

export default Navigation;

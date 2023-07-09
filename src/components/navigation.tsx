"use client";

import useNavigationStore, { NavMenu } from "@/store/navigation-store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

function findUrlIndex(url: NavMenu) {
  return navMenuItems.findIndex((item) => item.url === url) + 1;
}
const Navigation = () => {
  const { activeLink, setActiveLink } = useNavigationStore();
  const navContainerRef = useRef<HTMLUListElement | null>(null);
  const [accWidth, setAccWidth] = useState(0);

  useLayoutEffect(() => {
    if (navContainerRef.current) {
      const parentLeft = navContainerRef.current.getBoundingClientRect().left;
      const index = findUrlIndex(activeLink);

      const childLeft =
        navContainerRef.current.children[index].getBoundingClientRect().right;

      const width = childLeft - parentLeft + 10;
      setAccWidth(width);
    }
  }, [activeLink]);

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
      {navMenuItems.map((item) => (
        <NavItem
          key={item.text}
          text={item.text}
          selected={activeLink === item.url}
          url={item.url as NavMenu}
          onClick={() => setActiveLink(item.url as NavMenu)}
        />
      ))}
    </ul>
  );
};

const NavItem = ({
  text,
  selected,
  url,

  onClick,
}: {
  text: string;
  selected: boolean;
  url: NavMenu;
  onClick: () => void;
}) => {
  return (
    <li>
      <Link
        href={url}
        className={`${selected ? "font-semibold" : ""}`}
        onClick={onClick}
      >
        {text}
      </Link>
    </li>
  );
};

export default Navigation;

const navMenuItems = [
  { text: "top", url: "/" },
  { text: "about", url: "/about" },
  { text: "work", url: "/work" },
  { text: "hire me!", url: "/contact" },
];

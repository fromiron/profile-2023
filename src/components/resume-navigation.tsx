"use client";

import { NavMenu } from "@/store/navigation-store";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

const ResumeNavigation = () => {
  const navContainerRef = useRef<HTMLUListElement | null>(null);
  const [accWidth, setAccWidth] = useState(0);
  const pathname = usePathname().replace("/", "").split("/")[0];
  const navItems = useMemo(() => ["resume", "works"], []);

  useLayoutEffect(() => {
    function findUrlIndex(url: NavMenu) {
      return navItems.findIndex((item) => item === url) + 1;
    }
    if (navContainerRef.current) {
      const parentLeft = navContainerRef.current.getBoundingClientRect().left;
      const index = findUrlIndex(pathname);
      const childLeft =
        navContainerRef.current.children[index].getBoundingClientRect().right;
      const width = childLeft - parentLeft + 10;
      setAccWidth(width);
    }
  }, [navItems, pathname]);

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
          key={item}
          text={item}
          selected={pathname === item}
          url={item}
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
  url: string;
}) => {
  return (
    <li>
      <Link
        href={`/${url}`}
        className={`text-xl transition-all duration-500 ${
          selected ? "font-medium text-primary" : ""
        } select-none hover:text-primary`}
      >
        {text}
      </Link>
    </li>
  );
};

export default ResumeNavigation;

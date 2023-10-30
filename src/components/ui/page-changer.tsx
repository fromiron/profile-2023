"use client";
import makeDelay from "@/lib/makeDelay";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Variants, motion, useAnimationControls } from "framer-motion";

const variants: Variants = {
  initial: { translateX: "100%", opacity: 0 },
  visible: { translateX: "10%", opacity: 1 },
  disable: { translateX: "92%", opacity: 1 },
};

const PageChanger = () => {
  const pathname = usePathname();
  const controls = useAnimationControls();

  const handleFocusIn = () => {
    controls.start("visible");
  };
  const handleFocusOut = () => {
    makeDelay(4000, () => controls.start("disable"));
  };

  const init = async () => {
    await makeDelay(2000, () => controls.start("visible"));
    await makeDelay(4000, () => controls.start("disable"));
  };
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      variants={variants}
      animate={controls}
      initial="initial"
      onMouseEnter={handleFocusIn}
      onMouseLeave={handleFocusOut}
      className={`fixed right-0 top-[1rem] z-[9998] cursor-pointer rounded-l-lg bg-primary py-2 pl-2 pr-7`}
    >
      <Link href={pathname === "/" ? "/profile" : "/"} className="relative">
        <Button
          variant="ghost"
          size="default"
          className="text-xs font-semibold text-secondary focus-visible:ring-transparent"
        >
          {pathname === "/" ? "履歴ページ" : "メインページ"}
        </Button>
      </Link>
    </motion.div>
  );
};

export default PageChanger;

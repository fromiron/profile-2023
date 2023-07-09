"use client";
import { LayoutGroup, motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ScrollProgressBar = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });

  return (
    <div className="w-full h-full fixed left-12 bottom-full bg-orange-300">
      <motion.div className="absolute h-[9999px] bg-green-700 w-24" initial={{translateY:'100%'}}>
        s
      </motion.div>
    </div>
  );
};

export default ScrollProgressBar;

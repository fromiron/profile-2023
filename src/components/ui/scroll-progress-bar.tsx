"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { HEADER_HEIGHT } from "../layout/header";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const topPosition = useTransform(
    scrollYProgress,
    (value) => value * 100 + "%"
  );
  return (
    <div className="fixed top-0 left-4 w-[5px] h-screen">
      <motion.div
        id="div-1"
        className="absolute top-0 left-[2px] bg-primary w-[1px] h-screen origin-top"
        style={{ scaleY: scrollYProgress }}
      />
      <motion.div className={`absolute`} style={{ top: topPosition }}>
        <motion.div
          className={`absolute top-0 left-[2px] bg-primary w-[1px] origin-top`}
          style={{ height: HEADER_HEIGHT }}
        />
        <motion.div
          className={`absolute bg-primary top-[80px] -translate-y-[5px] w-[5px] h-[5px] rounded-full`}
          style={{ top: HEADER_HEIGHT }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollProgressBar;

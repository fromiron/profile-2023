"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { HEADER_HEIGHT } from "../layout/header";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const topPosition = useTransform(
    scrollYProgress,
    (value) => value * 100 + "%",
  );

  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      className="fixed -top-10 left-4 z-[9998] h-screen w-[5px]"
    >
      <motion.div
        className="absolute left-[2px] top-0 h-screen w-[1px] origin-top bg-primary"
        style={{ scaleY: scrollYProgress }}
      />
      <motion.div className={`absolute`} style={{ top: topPosition }}>
        <motion.div
          className={`absolute left-[2px] top-0 w-[1px] origin-top bg-primary`}
          style={{ height: HEADER_HEIGHT }}
        />
        <motion.div
          className={`absolute top-[80px] h-[5px] w-[5px] -translate-y-[5px] rounded-full bg-primary`}
          style={{ top: HEADER_HEIGHT }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollProgressBar;

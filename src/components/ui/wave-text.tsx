"use client";
import {
  motion,
  Variants,
  HTMLMotionProps,
  AnimatePresence,
} from "framer-motion";
import { FC, useEffect, useState } from "react";

interface Props extends HTMLMotionProps<"div"> {
  text: string[];
  delay?: number;
  duration?: number;
}

const WavyText: FC<Props> = ({ text, delay = 0.2, duration = 0.1 }: Props) => {
  const [textIndex, setTextIndex] = useState(0);

  const container: Variants = {
    initial: { opacity: 0 },
    animate: (i: number = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: duration,
        delayChildren: i * delay,
      },
    }),
    exit: {},
  };

  const child: Variants = {
    initial: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const onAnimationComplete = () => {
    const timer = setTimeout(() => {
      setTextIndex((textIndex + 1) % text.length);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text[textIndex]}
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex"
        onAnimationComplete={onAnimationComplete}
      >
        {text[textIndex].split("").map((letter, index) => (
          <motion.span key={index} variants={child}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default WavyText;

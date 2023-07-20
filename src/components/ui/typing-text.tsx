"use client";
import {
  motion,
  Variants,
  HTMLMotionProps,
  AnimatePresence,
} from "framer-motion";
import { FC, useState } from "react";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
  play: boolean;
}

const TypingText: FC<Props> = ({
  text,
  delay = 0.2,
  duration = 0.1,
  play = true,
}: Props) => {
  const container: Variants = {
    initial: {},
    animate: (i: number = 1) => ({
      transition: {
        staggerChildren: duration,
        delayChildren: i * delay,
      },
    }),
  };

  const child: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate={play ? "animate" : "initial"}
      exit="exit"
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TypingText;

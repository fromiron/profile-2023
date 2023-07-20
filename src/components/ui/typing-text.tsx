"use client";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { FC } from "react";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
  play: boolean;
  extraStyles?: string;
}

const TypingText: FC<Props> = ({
  text,
  delay = 0.2,
  duration = 0.1,
  play = true,
  extraStyles,
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
    <motion.span
      variants={container}
      initial="initial"
      animate={play ? "animate" : "initial"}
      exit="exit"
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={child} className={extraStyles}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TypingText;

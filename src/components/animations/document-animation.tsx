"use client";
import documentAnimation from "@/lottie/document-animation.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";

export default function DocumentAnimation() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const pause = () => {
    lottieRef?.current?.pause();
  };
  const play = () => {
    lottieRef?.current?.play();
  };

  return (
    <Lottie
      className="h-24 cursor-pointer transition hover:scale-125"
      lottieRef={lottieRef}
      animationData={documentAnimation}
      onMouseEnter={pause}
      onMouseLeave={play}
    />
  );
}

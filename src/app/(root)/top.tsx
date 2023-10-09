"use client";

import WavyText from "@/components/ui/wave-text";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { FONT_EN } from "@/styles/fonts";
import Image from "next/image";
import { useRef } from "react";

const text = ["creative", "visionary", "professional", "strategic"];
export default function TopSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#top");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  return (
    <section
      ref={targetRef}
      id="top"
      className="relative flex flex-col justify-center lg:justify-normal lg:flex-row lg:items-center"
    >
      <div
        className={`${FONT_EN} font-light text-5xl select-none z-10 py-20 lg:py-0`}
      >
        <div>i’m a</div>
        <div className="font-normal text-6xl lg:text-8xl flex items-center">
          <div className="h-4 w-4 rounded-full bg-primary -mb-4 ml-2 mr-4 relative">
            <div className="absolute h-[1px] -z-10 w-[600px] -rotate-45 bg-gray dark:opacity-20 -left-40 top-1/2" />
          </div>
          <WavyText text={text} duration={0.1} delay={0.02} />
        </div>
        <div>web developer</div>
      </div>
      <Image
        src={"/iam.png"}
        alt="iam"
        width={682}
        height={620}
        className="static lg:absolute right-0 z-0"
      />
    </section>
  );
}

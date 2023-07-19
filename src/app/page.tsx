"use client";
import WavyText from "@/components/ui/wave-text";
import { FONT_EN } from "@/styles/fonts";
import Image from "next/image";

const text = [
  "creative",
  "visionary",
  "professional",
  "strategic",
];

export default function Home() {
  return (
    <div className="min-h-screen-without-header relative flex flex-col justify-center lg:justify-normal lg:flex-row lg:items-center">
      <div className={`${FONT_EN} font-light text-5xl select-none z-10 py-20 lg:py-0`}>
        <Iam />
      </div>
      <Image
        src={"/iam.png"}
        alt="iam"
        width={682}
        height={620}
        className="static lg:absolute right-0 z-0"
      />
    </div>
  );
}

function Iam() {
  return (
    <>
      <div>i’m a</div>
      <div className="font-normal text-6xl lg:text-8xl flex items-center">
        <div className="h-4 w-4 rounded-full bg-primary -mb-4 ml-2 mr-4" />
        <WavyText text={text} duration={0.1} delay={0.02} />
      </div>
      <div>web developer</div>
    </>
  );
}

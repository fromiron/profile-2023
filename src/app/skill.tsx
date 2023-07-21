"use client";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { FONT_EN } from "@/styles/fonts";
import { useRef, useState } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  image: string;
  color: string;
  message: string;
}
const SKILLS: Skill[] = [
  {
    name: "JavaScript",
    image: "/js.png",
    color: "#f0db4f",
    message: "Web's native programming language.",
  },
  {
    name: "TypeScript",
    image: "/ts.png",
    color: "#007acc",
    message: "JavaScript with static types.",
  },
  {
    name: "Next.js",
    image: "/nextjs.png",
    color: "#343434",
    message: "React framework for server rendering.",
  },
  {
    name: "Gatsby",
    image: "/gatsby.png",
    color: "#6a4495",
    message: "React-based static site generator.",
  },
  {
    name: "TailwindCSS",
    image: "/tailwind.png",
    color: "#06b6d4",
    message: "Utility-first CSS framework.",
  },
  {
    name: "Strapi",
    image: "/strapi.png",
    color: "#4e26e0",
    message: "Open-source headless CMS.",
  },
  {
    name: "Python",
    image: "/python.png",
    color: "#27335c",
    message: "Readable, versatile scripting language.",
  },
  {
    name: "Django",
    image: "/django.png",
    color: "#113228",
    message: "High-level Python web framework.",
  },
];

export default function SkillSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#skill");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });

  const [selected, setSelected] = useState<Skill>(SKILLS[0]);

  return (
    <section
      ref={targetRef}
      id="skill"
      className="flex flex-col justify-center items-center"
    >
      <div className={`${FONT_EN} mb-24 w-full relative`}>
        <div className="font-thin absolute -top-7 left-1/4 text-xl">i use</div>
        <div
          className="text-6xl lg:text-9xl font-light mb-4 text-center relative"
          style={{ color: selected.color }}
        >
          {selected.name}
          <div className="absolute h-[1px] -z-10 w-[600px] -rotate-45 bg-gray dark:opacity-20 left-1/2 -translate-x-1/2 top-1/2" />

        </div>
        <div className="font-thin text-center">{selected.message}</div>
      </div>
      <ul className="grid grid-cols-4 lg:grid-cols-8 gap-4">
        {SKILLS.map((item) => (
          <div
            key={item.name}
            className={`cursor-pointer group relative w-full h-full flex justify-center items-center grayscale transition duration-500 ${
              selected.name === item.name ? "grayscale-0" : "grayscale-100"
            }`}
            onMouseEnter={() => setSelected(item)}
          >
            <Image
              alt={item.name}
              src={item.image}
              width={96}
              height={96}
              className={`relative transition duration-500 ${
                selected.name === item.name
                  ? "-translate-y-5 shadow-md scale-105"
                  : "-translate-y-0"
              } }`}
            />
            <div className={`absolute transition duration-500 -translate-x-1/2 ${
                selected.name === item.name
                  ? "-translate-y-0"
                  : "-translate-y-5"
              } group-hover:-translate-y-0 left-1/2 bottom-0 w-3 h-3 rounded-full -z-10 bg-primary`} />
          </div>
        ))}
      </ul>
    </section>
  );
}

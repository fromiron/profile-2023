"use client";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { useRef } from "react";

export default function AboutSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#about");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  return (
    <section ref={targetRef} id="about">
      about
    </section>
  );
}

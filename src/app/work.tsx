"use client";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { useRef } from "react";

export default function WorkSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#work");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  return (
    <section ref={targetRef} id="work">
      work
    </section>
  );
}

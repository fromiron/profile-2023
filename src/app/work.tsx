"use client";
import ImageSlider from "@/components/ui/image-slider";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { useRef } from "react";

const images = ["/work/1.png", "/work/2.png", "/nextjs.png"];

export default function WorkSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#work");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  return (
    <section ref={targetRef} id="work">
      <div className="lg:flex">
        <div className="flex-1">
          <ImageSlider images={images} />
        </div>
        <div className="flex-1 bg-red-300"></div>
      </div>
    </section>
  );
}

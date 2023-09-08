"use client";
import ImageSlider from "@/components/ui/image-slider";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { useRef } from "react";
import {  BackendBadge, DesignBadge, FrontendBadge } from "@/components/ui/badge"

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
          <div className="max-w-sm mx-auto">
            <ImageSlider images={images} />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="">
            美容サロン
          </div>
          <div className="flex gap-2">
            <DesignBadge/>
            <BackendBadge/>
            <FrontendBadge/>
          </div>
        </div>
      </div>
    </section>
  );
}

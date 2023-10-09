"use client";
import ImageSlider from "@/components/ui/image-slider";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { allCategories } from "@/contentlayer/generated";
import { FONT_EN } from "@/styles/fonts";
import MdxRenderer from "@/components/mdx-renderer";

const DISPLAY_LIMIT = 5;

export default function WorkSection() {
  const [index, setIndex] = useState(0);
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#work");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  const limited = allCategories.slice(0, DISPLAY_LIMIT);
  const mainImages = limited.map((c) => c.image);
  const { title, tags, body } = allCategories[index];

  return (
    <section ref={targetRef} id="work">
      <div className="mx-auto mt-10 grid max-w-sm grid-cols-1 justify-center md:max-w-full  lg:grid-cols-2">
        <div className="mx-auto aspect-square w-full max-w-sm">
          <ImageSlider images={mainImages} setIndex={setIndex} index={index} />
        </div>
        <Description title={title} tags={tags}>
          <MdxRenderer body={body} />
        </Description>
      </div>
    </section>
  );
}

interface DescriptionProps {
  title: string;
  tags?: string[];
  children: React.ReactNode;
}
function Description({ title, tags, children }: DescriptionProps) {
  return (
    <div className="mt-12">
      <div className="mb-4 text-4xl font-bold text-primary">{title}</div>
      <div className="flex w-full gap-2">
        {tags?.map((tag) => (
          <Badge variant="default" className={FONT_EN} key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

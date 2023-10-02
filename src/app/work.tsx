"use client";
import ImageSlider from "@/components/ui/image-slider";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { allWorks } from "@/contentlayer/generated";
import { FONT_EN } from "@/styles/fonts";
import { Button } from "@/components/ui/button";
import DocumentAnimation from "@/components/animations/document-animation";

const WORK_DISPLAY_LIMIT = 5;

export default function WorkSection() {
  const [index, setIndex] = useState(0);
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#work");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  const limitedWorks = allWorks.slice(0, WORK_DISPLAY_LIMIT);
  const mainImages = limitedWorks.map((work) => work.image);
  const work = allWorks[index];

  return (
    <section ref={targetRef} id="work">
      <div className="flex w-full flex-col justify-center py-10 lg:py-20">
        <div>私はこういうことができます。</div>
        <Button variant="outline" size={"lg"}>
          ワークページから詳しくみる
        </Button>
      </div>
      <div className="mx-auto mt-10 grid max-w-sm grid-cols-1 justify-center md:max-w-full  lg:grid-cols-2">
        <div className="mx-auto aspect-square w-full max-w-sm">
          <ImageSlider images={mainImages} setIndex={setIndex} index={index} />
        </div>
        <Description
          title={work.title}
          tags={work.tags}
          description={work.description}
        />
      </div>
      {/* TODO　ワークページに移動するボタンデザイン */}
      <DocumentAnimation />
    </section>
  );
}

interface DescriptionProps {
  title: string;
  tags?: string[];
  description: string;
}
function Description({ title, tags, description }: DescriptionProps) {
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
      <div className="mt-8">{description}</div>
    </div>
  );
}

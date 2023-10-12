"use client";
import ImageSlider from "@/components/ui/image-slider";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FONT_EN } from "@/styles/fonts";
import MdxRenderer from "@/components/mdx-renderer";
import { Button } from "@/components/ui/button";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { allCategories } from "contentlayer/generated";

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
    <section
      ref={targetRef}
      id="work"
      className="flex items-center justify-center"
    >
      <div className="mx-auto mt-10 grid max-w-sm grid-cols-1 justify-center md:max-w-full  lg:grid-cols-2">
        <div className="mx-auto aspect-square w-full max-w-sm">
          <ImageSlider images={mainImages} setIndex={setIndex} index={index} />
        </div>
        <Description title={title} tags={tags}>
          <MdxRenderer code={body.code} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="mt-8 w-full">
                <Button variant={"ghost"} className="w-full" asChild>
                  <Link href="/works" target="_blank">
                    <HiMiniArrowTopRightOnSquare className="h-4 w-4" />
                    <span className={`${FONT_EN} ml-2`}>View All Works</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-8 text-lg shadow-md">
                <p>別のタブで開きます</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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

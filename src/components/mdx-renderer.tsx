"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { VscLinkExternal } from "react-icons/vsc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ImageArrayRenderer from "./ui/image-array-renderer";

const StringComponent = (props: any) => {
  const { children } = props;
  const StringEl = (str: string, i: number) => {
    return (
      <strong className="relative" key={i}>
        <span className="truncate font-bold">{str}</span>
        <span className="absolute bottom-0 left-0 right-0 -z-10 h-2 bg-primary/40" />
      </strong>
    );
  };
  return (
    <>{children.split("").map((str: string, i: number) => StringEl(str, i))}</>
  );
};
const LinkComponent = (props: any) => {
  const { children, ...rest } = props;
  return (
    <a {...rest} className="inline cursor-pointer select-none text-primary">
      <span>{children}</span>
      <VscLinkExternal className="ml-1 inline" />
    </a>
  );
};

const OlComponent = (props: any) => {
  return (
    <div className="-mt-4">
      <Accordion type="multiple">
        <AccordionItem value="item1">
          <AccordionTrigger />
          <AccordionContent>
            <ol className="text-base font-medium" {...props} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const PComponent = (props: any) => {
  const { children } = props;
  if (children instanceof Array) {
    // imgの数を数えて2つ以上ならCarouselSliderを返す
    const childrenArray = children.filter(
      (child: any) => child?.type?.name === "img",
    );
    if (childrenArray.length > 1) {
      const images = childrenArray.map((item) => item.props);
      return <ImageArrayRenderer images={images} />;
    }
  }

  return <p {...props} />;
};

const EmComponent = (props: any) => {
  return (
    <span
      className="underline decoration-primary/40 decoration-wavy underline-offset-4"
      {...props}
    />
  );
};

const components: MDXComponents = {
  strong: StringComponent,
  a: LinkComponent,
  ol: OlComponent,
  hr: () => <hr className="my-8 border-none" />,
  em: EmComponent,
  img: (props: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      className="w-full rounded-lg border transition-colors duration-500 hover:border-primary"
      width={800}
      height={800}
    />
  ),
  p: PComponent,
};

const MdxRenderer = ({ code }: { code: string }) => {
  const MDXContent = useMDXComponent(code || "");
  return (
    <div className="prose prose-stone col-span-12 w-full dark:prose-invert lg:col-span-8">
      <MDXContent components={components} />
    </div>
  );
};

export default MdxRenderer;

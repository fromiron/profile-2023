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

const StringComponent = (props: any) => {
  return (
    <strong className="relative">
      <span className="truncate font-bold" {...props} />
      <span className="absolute bottom-0 left-0 right-0 -z-10 h-2 bg-primary/40" />
    </strong>
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

const HeadingComponent = (props: any, level: number) => {
  const HeadingLevel = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingLevel {...props} />;
};
const OlComponent = (props: any) => {
  const { children } = props;

  return (
    <div className="-mt-4">
      <Accordion type="multiple">
        <AccordionItem value="item1">
          <AccordionTrigger />
          <AccordionContent>
            <ol className="text-base">{children}</ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const components: MDXComponents = {
  h1: (props: any) => HeadingComponent(props, 1),
  h2: (props: any) => HeadingComponent(props, 2),
  h3: (props: any) => HeadingComponent(props, 3),
  h4: (props: any) => HeadingComponent(props, 4),
  h5: (props: any) => HeadingComponent(props, 5),
  h6: (props: any) => HeadingComponent(props, 6),
  strong: StringComponent,
  a: LinkComponent,
  ol: OlComponent,
  hr: () => <hr className="my-8 border-none" />,
  img: (props: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      className="w-full rounded-lg border transition-colors duration-500 hover:border-primary"
      width={400}
      height={400}
    />
  ),
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

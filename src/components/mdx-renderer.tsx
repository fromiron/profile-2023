"use client";
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Heading from "./ui/heading";
import type { MDXComponents } from "mdx/types";

const createHeadingComponent = (level: number) => {
  const HeadingComponent: React.FC<
    DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
  > = ({ children }) => <Heading level={level}>{children}</Heading>;
  return HeadingComponent;
};

const components: MDXComponents = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
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
    <div className="prose prose-stone col-span-12 max-w-max dark:prose-invert lg:col-span-8">
      <MDXContent components={components} />
    </div>
  );
};

export default MdxRenderer;

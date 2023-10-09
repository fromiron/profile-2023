"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

const mdxComponents = {
  Image,
};

const MdxRenderer = ({ mdx, body }: { mdx?: any; body?: any }) => {
  const MDXContent = useMDXComponent(body ? body.code : mdx.body.code);
  return (
    <div className="prose col-span-12 max-w-max dark:prose-invert sm:prose-base md:prose-lg lg:col-span-8">
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default MdxRenderer;

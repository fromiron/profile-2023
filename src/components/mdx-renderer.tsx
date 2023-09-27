"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

const mdxComponents = {
  Image,
};

const MdxRenderer = ({ mdx }: { mdx: any }) => {
  const MDXContent = useMDXComponent(mdx.body.code);
  return (
    <div className="prose col-span-12 max-w-max sm:prose-base md:prose-lg first-letter:text-3xl sm:first-letter:text-5xl lg:col-span-8">
      <MDXContent components={mdxComponents} />
    </div>
  );
};

export default MdxRenderer;

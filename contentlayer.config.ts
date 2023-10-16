import { defineDocumentType, makeSource } from "contentlayer/source-files";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeExternalLink from "rehype-external-links";
import rehypeShiftHeading from "rehype-shift-heading";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

export interface Work {
  title: string;
  image: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isPublished: boolean;
  url: string;
}

export interface Profile {
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
export const Profile = defineDocumentType(() => ({
  name: "Profile",
  filePathPattern: `**/profile/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    comment: {
      type: "string",
      required: true,
    },
    createdAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
  },
}));

export const Works = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: `**/works/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    author: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
    createdAt: {
      type: "date",
      required: true,
    },
    updatedAt: {
      type: "date",
      required: true,
    },
    publishedAt: {
      type: "date",
      required: true,
    },
    isPublished: {
      type: "boolean",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath.replaceAll(" ", "-")}`,
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
    toc: {
      type: "json",
      resolve: async (doc) => {
        const regularExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        return Array.from(doc.body.raw.matchAll(regularExp)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level:
                flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          },
        );
      },
    },
  },
}));

export interface Category {
  title: string;
  image: string;
  tags: string[];
}

export const Categories = defineDocumentType(() => ({
  name: "Category",
  filePathPattern: `**/categories/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: true,
    },
  },
}));

const rehypeOptions = {
  theme: "github-dark",
};
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Works, Categories, Profile],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypeAccessibleEmojis,
      [rehypeShiftHeading, { shift: 1 }],
      [rehypeExternalLink, { target: "_blank", rel: ["noopener"] }],
      [rehypePrettyCode, rehypeOptions],
    ],
  },
});

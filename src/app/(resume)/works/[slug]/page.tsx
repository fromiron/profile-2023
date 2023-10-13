import Image from "next/image";
import MdxRenderer from "@/components/mdx-renderer";
import { notFound } from "next/navigation";
import META_DATA from "@/constants/metaData";
import { allWorks } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return allWorks.map((work) => ({ slug: work.url }));
}

export async function generateMetadata({ params }: any) {
  const work = allWorks.find((work) => work.url === params.slug);
  if (!work) {
    return;
  }

  const publishedAt = new Date(work.publishedAt).toISOString();
  const modifiedAt = new Date(work.updatedAt || work.publishedAt).toISOString();

  let imageList = [META_DATA.SOCIAL_BANNER];
  if (work.image) {
    imageList =
      typeof work.image === "string"
        ? [META_DATA.SITE_URL + work.image.replace("../public", "")]
        : work.image;
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : META_DATA.SITE_URL + img };
  });

  const authors = work?.author ? [work.author] : META_DATA.AUTHOR;

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      url: META_DATA.SITE_URL + work.url,
      siteName: META_DATA.TITLE,
      locale: META_DATA.LOCALE,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [META_DATA.AUTHOR],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.description,
      images: ogImages,
    },
  };
}

async function getMarkdownFromSlug(slug: string) {
  const work = allWorks.find(
    (work) => work.url.replace("/works/", "") === slug,
  );
  if (!work) {
    notFound();
  }
  return work;
}

interface PageProps {
  params: { slug: string };
}
export default async function WorkPage({ params: { slug } }: PageProps) {
  const work = await getMarkdownFromSlug(slug);

  return (
    <section>
      <article>
        <div className="group relative h-[40vh] w-full overflow-hidden">
          <div className="absolute right-0 top-1/2 z-40 h-[1px] w-[600px] translate-x-1/2 -rotate-45 bg-primary dark:opacity-20" />
          <div className="absolute bottom-[10%] z-50 mx-[5%]  rounded-lg bg-primary-foreground/30 p-10 px-[10%] shadow-sm backdrop-blur-sm md:bottom-[20%]">
            <div className="flex items-center">
              <div className="mr-4 h-4 w-4 rounded-full bg-primary" />
              <h1 className="text-2xl font-medium lg:text-3xl">
                {work?.title}
              </h1>
            </div>
            <div className="mt-2">
              {work?.tags && work.tags.length > 0
                ? work.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="mr-2 inline text-sm text-black/60"
                    >
                      {tag}
                    </Badge>
                  ))
                : null}
            </div>
          </div>

          <Image
            src={work?.image ?? ""}
            alt={work?.title ?? "work main image"}
            width={400}
            height={400}
            className="h-full w-full rounded-xl border border-secondary object-cover object-center grayscale transition duration-500 hover:border-primary hover:grayscale-0"
            priority
            sizes="100vw"
          />
        </div>
        <div className="mt-8 grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8">
          <div className="col-span-12 lg:col-span-4">
            <details
              className="sticky top-[7rem] max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border border-solid p-4"
              open
            >
              <summary className="cursor-pointer text-lg font-semibold capitalize text-primary">
                Table Of Content
              </summary>
              <ul className="font-in mt-4 text-base">
                {work.toc.map((heading: any) => {
                  return (
                    <li key={`#${heading.slug}`} className="py-1">
                      <a
                        href={`#${heading.slug}`}
                        data-level={heading.level}
                        className="flex
                                  items-center justify-start border-solid
                                  data-[level=two]:border-t
                                  data-[level=three]:pl-4
                                  data-[level=two]:pl-0 data-[level=two]:pt-2 sm:data-[level=three]:pl-6
                                  "
                      >
                        {heading.level === "three" ? (
                          <span className="mr-2 flex h-1 w-1 rounded-full">
                            &nbsp;
                          </span>
                        ) : null}

                        <span className="hover:underline">{heading.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </div>
          <MdxRenderer code={work.body.code} />
        </div>
      </article>
    </section>
  );
}

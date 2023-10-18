import Image from "next/image";
import MdxRenderer from "@/components/mdx-renderer";
import { notFound } from "next/navigation";
import META_DATA from "@/constants/metaData";
import { allWorks } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import japanDate from "@/lib/japanDate";
import ScrollAnchor from "@/components/scroll-anchor";
import { cn } from "@/lib/utils";

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
        <div className="group relative h-[50vh] w-full overflow-hidden">
          <div className="absolute bottom-[10%] z-50 mx-[5%]  rounded-lg bg-primary-foreground/50 p-10 px-[10%] shadow-lg backdrop-blur-sm md:bottom-[20%]">
            <div className="flex items-center">
              <div className="mr-4 aspect-square w-4 rounded-full bg-primary" />
              <h1 className="text-3xl font-bold text-black lg:text-4xl">
                {work?.title}
              </h1>
            </div>
            <div className="mt-4">
              {work?.tags && work.tags.length > 0
                ? work.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="mb-2 mr-2 text-[0.6rem] text-black/60 shadow-md"
                    >
                      {tag}
                    </Badge>
                  ))
                : null}
            </div>
            <div className="mt-5 gap-x-4 border-t border-gray pt-5 text-[0.6rem] text-black/80">
              <p>{japanDate(work.createdAt)}作成</p>
              <p>{japanDate(work.updatedAt)}修正</p>
            </div>
          </div>

          <div className="h-full w-full overflow-hidden rounded-xl border border-secondary object-cover object-center  transition duration-500 hover:border-primary ">
            <div className="absolute left-[5%] z-10 rounded-b-lg bg-secondary px-2 pb-1 pt-2 text-center text-[0.6rem] text-secondary-foreground shadow-sm first-letter:font-bold">
              {work?.readingTime?.text}
            </div>

            <Image
              src={work?.image ?? ""}
              alt={work?.title ?? "work main image"}
              width={400}
              height={400}
              className="h-full w-full object-cover object-center grayscale transition duration-500 group-hover:grayscale-0"
              priority
              sizes="100vw"
            />
            <div className="absolute bottom-[1px] right-[1px]  aspect-square h-full overflow-hidden">
              <div className="absolute right-0 top-1/2 h-[1px] w-[2000px] translate-x-1/2 -rotate-45 bg-primary dark:opacity-20" />
            </div>
          </div>
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
              <ul className="mt-4 text-xs md:text-sm">
                {work.toc.map((heading: any) => {
                  return (
                    <li key={`#${heading.slug}`}>
                      <ScrollAnchor
                        {...heading}
                        className={cn(
                          "block cursor-pointer pt-2 text-black transition-colors duration-500 hover:text-primary",
                          heading.level === 1 && "mt-2 w-full font-semibold",
                          heading.level === 2 && "pl-4",
                          heading.level === 3 && "pl-8",
                        )}
                      >
                        <span className="underline-offset-4 hover:underline">
                          {heading.text}
                        </span>
                      </ScrollAnchor>
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

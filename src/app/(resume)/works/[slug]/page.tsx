import { allWorks } from "@/contentlayer/generated";
import Image from "next/image";
import MdxRenderer from "@/components/mdx-renderer";
import { notFound } from "next/navigation";
import META_DATA from "@/constants/metaData";

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
  console.log(slug);

  return (
    <section>
      <article>
        <div className="group relative flex h-[50vh] w-full items-center justify-center">
          <h1 className="absolute z-50 mx-4 flex h-auto items-center justify-center overflow-hidden rounded-lg bg-primary-foreground px-12 py-8 text-4xl font-medium transition-all">
            {work?.title}
            <div className="absolute left-4 top-4 -z-10 aspect-square h-4 w-4 rounded-full bg-primary" />
          </h1>

          <div className="h-full w-full overflow-hidden rounded-xl border border-transparent transition duration-500 group-hover:border-primary">
            <Image
              src={work?.image ?? ""}
              alt={work?.title ?? "work main image"}
              width={400}
              height={400}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:blur-sm group-hover:grayscale "
              priority
              sizes="100vw"
            />
            d d
          </div>
        </div>
        <div className="sxl:gap-16 mt-8  grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8">
          <div className="col-span-12  lg:col-span-4">
            <details
              className="border-dark dark:border-light text-dark dark:text-light sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border-[1px] border-solid p-4"
              open
            >
              <summary className="cursor-pointer text-lg font-semibold capitalize">
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
          <MdxRenderer mdx={work} />
        </div>
      </article>
    </section>
  );
}

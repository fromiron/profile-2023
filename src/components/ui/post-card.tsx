import textSplitter from "@/lib/textSlicer";
import Link from "next/link";
import Image from "next/image";
import Logo from "../svg/logo";
import { Badge } from "./badge";
import { Work } from "contentlayer/generated";

export default function PostCard({
  work,
  isBig = false,
  showAccBlock = false,
}: {
  work: Work;
  isBig: boolean;
  showAccBlock: boolean;
}) {
  const wrapperClass = isBig
    ? "col-span-6 md:col-span-4 lg:col-span-4"
    : "col-span-6 md:col-span-2 lg:col-span-2";

  const wrapperClass2 = showAccBlock
    ? "h-full flex flex-col justify-between"
    : "";

  return (
    <>
      <li key={work.url} className={wrapperClass + wrapperClass2}>
        {showAccBlock && (
          <div className="hidden aspect-[7/5] w-0 items-center justify-center rounded-lg bg-secondary md:flex md:w-full">
            <Logo />
          </div>
        )}
        <Link href={work.url}>
          <div className="group relative aspect-[7/5] overflow-hidden rounded-lg">
            <Image
              src={work.image}
              width={isBig ? 800 : 400}
              height={isBig ? 800 : 400}
              alt={work.title}
              className="h-full w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl group-focus:scale-105 group-active:scale-105"
            />
            <div className="absolute inset-0 z-50 flex items-end bg-gradient-to-t from-gray-900/70 to-gray-900/50 transition-all group-hover:to-gray-900/10">
              <div className="bg-transparent px-4 pb-4 text-white">
                <Badge variant={"secondary"}>{work.readingTime}分</Badge>
                <h3 className="my-2 text-xl font-semibold lg:text-xl">
                  {work.title}
                </h3>
                <p className="sm:hidden lg:block">
                  {textSplitter(work.description, 35)[1].length > 0
                    ? textSplitter(work.description, 35)[0] + "..."
                    : textSplitter(work.description, 35)[0]}
                </p>
                <div className="-mx-1 mt-2">
                  {work.tags &&
                    work.tags.length > 0 &&
                    work.tags.map((tag, i) => {
                      if (i < 4)
                        return (
                          <Badge
                            key={`${work.title}_${tag}`}
                            className="mx-1 mb-1"
                          >
                            {tag}
                          </Badge>
                        );
                    })}
                  {work.tags && work.tags.length >= 4 && (
                    <Badge className="mx-1 mb-1">...</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

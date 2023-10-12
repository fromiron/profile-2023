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
          <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-secondary">
            <Logo />
          </div>
        )}
        <Link href={work.url}>
          <div className="group relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={work.image}
              width={300}
              height={300}
              alt={work.title}
              className="h-full w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl group-focus:scale-105 group-active:scale-105"
            />
            <div className="absolute  inset-0 z-50 flex items-end bg-gradient-to-t from-black/80 to-black/30 transition-all group-hover:to-black/20">
              <div className="bg-transparent px-4 pb-4 text-white">
                <p>{work.readingTime.text}</p>
                <h3 className="my-2 text-2xl">{work.title}</h3>
                <p className="text-bold">
                  {textSplitter(work.description, 35)[1].length > 0
                    ? textSplitter(work.description, 35)[0] + "..."
                    : textSplitter(work.description, 35)[0]}
                </p>
                <div className="-mx-1 mt-2">
                  {work.tags &&
                    work.tags.length > 0 &&
                    work.tags.map((tag) => (
                      <Badge key={`${work.title}_${tag}`} className="mx-1 mb-1">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

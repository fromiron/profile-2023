"use client";
import { Button } from "@/components/ui/button";
import ImageWrapper from "@/components/ui/image-wrapper";
import { Work, allWorks } from "@/contentlayer/generated";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WorksPage() {
  const publishedWorks = allWorks
    .filter((work) => work.isPublished === true)
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
    );

  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [filteredWorks, setFilteredWorks] = useState<Work[]>(publishedWorks);
  const handleTag = (newTag: string) => {
    if (newTag === selectedTag) return setSelectedTag("all");
    if (newTag === "all" || newTag === "" || newTag.length === 0) {
      return setSelectedTag("all");
    }
    setSelectedTag(newTag);
  };

  useEffect(() => {
    if (
      selectedTag === "all" ||
      selectedTag === "" ||
      selectedTag.length === 0
    ) {
      return setFilteredWorks(publishedWorks);
    }
    setFilteredWorks(
      publishedWorks.filter((work) => work?.tags?.includes(selectedTag)),
    );
  }, [publishedWorks, selectedTag]);

  if (
    publishedWorks?.length === 0 ||
    !publishedWorks ||
    !filteredWorks ||
    filteredWorks?.length === 0
  )
    return (
      <section>
        <div className="text-primary">no works found</div>
      </section>
    );
  if (!publishedWorks)
    return <div className="text-primary">no works found</div>;
  if (filteredWorks.length === 0)
    return <div className="text-primary">no works found</div>;
  const tags = [
    ...new Set(publishedWorks.map((work: Work) => work.tags).flat()),
  ];

  return (
    <section>
      <ul className="mb-8 flex gap-x-4">
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <li key={`tag${i}`}>
              <Button
                variant={`${selectedTag === tag ? "default" : "outline"}`}
                size={"sm"}
                onClick={() => handleTag(tag ?? "")}
              >
                {tag}
              </Button>
            </li>
          ))}
      </ul>
      <ul className="grid grid-cols-12 gap-x-8 gap-y-12">
        {filteredWorks.map((work: Work) => (
          <li key={work.url} className="col-span-12 lg:col-span-4">
            <Link href={work.url}>
              <div className="relative aspect-square">
                <ImageWrapper src={work.image} />
              </div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              <p>{work.readingTime.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

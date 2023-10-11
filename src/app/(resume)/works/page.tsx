"use client";

import { Work, allWorks } from "@/contentlayer/generated";
import { useEffect, useState } from "react";
import PostCard from "@/components/ui/post-card";
import TagItem from "@/components/ui/tag-item";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  if (
    publishedWorks?.length === 0 ||
    !publishedWorks ||
    !filteredWorks ||
    filteredWorks?.length === 0
  ) {
    return <NotFound />;
  }

  const tagCount: { [key: string]: number } = publishedWorks.reduce(
    (accumulator: { [key: string]: number }, work) => {
      if (work.tags) {
        work.tags.forEach((tag: string) => {
          accumulator[tag] = (accumulator[tag] || 0) + 1;
        });
      }
      return accumulator;
    },
    {},
  );

  return (
    <section>
      <ul className="-mx-2 mb-8 border-b pb-4">
        {Object.entries(tagCount).map(([tag, count]) => (
          <TagItem
            key={tag}
            count={count}
            tag={tag}
            selectedTag={selectedTag}
            handleTag={() => handleTag(tag ?? "all")}
          />
        ))}
      </ul>
      <ul className="grid grid-cols-6 gap-x-8 gap-y-12">
        {filteredWorks.map((work: Work, i) => (
          <PostCard
            key={work._id}
            work={work}
            isBig={i === 0}
            showAccBlock={i === 1}
          />
        ))}
      </ul>
    </section>
  );
}

function NotFound() {
  return (
    <section>
      <div className="text-primary">no works found</div>
    </section>
  );
}

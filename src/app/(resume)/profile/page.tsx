import MdxRenderer from "@/components/mdx-renderer";

import { allProfiles } from "contentlayer/generated";
export default async function profilePage() {
  return (
    <section>
      <article className="mx-auto max-w-5xl rounded-xl border border-gray px-8 py-14">
        <div className="mb-24 mt-12 text-center">
          <h1 className="text-4xl font-bold">{allProfiles[0].title}</h1>
          <p className="mt-4">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary" />
            {allProfiles[0]?.comment}
          </p>
        </div>
        <MdxRenderer code={allProfiles[0]?.body?.code || ""} />
      </article>
    </section>
  );
}

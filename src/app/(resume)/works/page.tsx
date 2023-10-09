import { Work, allWorks } from "@/contentlayer/generated";
import Image from "next/image";

export default async function WorksPage() {
  if (allWorks.length === 0) return <div>loading...</div>;
  if (!allWorks) return <div>loading...</div>;

  return (
    <section>
      <ul>
        {allWorks.map((work: Work) => (
          <li key={work._raw.flattenedPath}>
            <Image src={work.image} alt={work.title} width={400} height={400} />
            <h2>{work.title}</h2>
            <p>{work.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

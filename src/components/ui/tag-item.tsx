import { Badge } from "./badge";
import { Button } from "./button";

export default function TagItem({
  tag,
  count,
  selectedTag,
  handleTag,
}: {
  tag: string;
  count: number;
  selectedTag: string;
  handleTag: () => void;
}) {
  return (
    <li key={tag} className="mx-2 inline">
      <Button
        variant={`${selectedTag === tag ? "default" : "outline"}`}
        size={"sm"}
        onClick={handleTag}
        className="mb-2"
      >
        {tag}
        <Badge variant={"secondary"} className="ml-2">
          {count}
        </Badge>
      </Button>
    </li>
  );
}

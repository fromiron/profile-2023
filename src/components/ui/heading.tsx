import { ReactNode } from "react";

interface HeadingProps {
  level: number;
  children: ReactNode;
}
const Heading = ({ level, children }: HeadingProps) => {
  const HeadingLevel = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingLevel className="text-primary">
      <span className="mr-2 inline-block h-3 w-3 rounded-full bg-primary" />
      {children}
    </HeadingLevel>
  );
};

export default Heading;

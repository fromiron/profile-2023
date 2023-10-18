"use client";
import { ReactNode } from "react";
type Props = {
  slug: string;
  className: string;
  children: ReactNode;
};

export default function ScrollAnchor(props: Props) {
  const { slug, className, children, ...rest } = props;
  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    const headerElement = document.querySelector("header");
    if (targetElement) {
      const targetOffset =
        targetElement.offsetTop - (headerElement?.offsetHeight ?? 0);

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <a onClick={() => handleScroll(slug)} className={` ${className}`} {...rest}>
      {children}
    </a>
  );
}

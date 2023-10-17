"use client";
import { ReactNode } from "react";
type Props = {
  id: string;
  className: string;
  children: ReactNode;
};

export default function ScrollAnchor(props: Props) {
  const { id, className, children, ...rest } = props;
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
    <a onClick={() => handleScroll(id)} className={` ${className}`} {...rest}>
      {children}
    </a>
  );
}

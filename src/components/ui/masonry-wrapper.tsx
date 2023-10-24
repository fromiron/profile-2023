import { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function MasonryWrapper({ children }: { children: ReactNode }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter="10px">{children}</Masonry>
    </ResponsiveMasonry>
  );
}

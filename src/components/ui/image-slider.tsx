import { motion } from "framer-motion";
import { useState } from "react";
import ImageWrapper from "./image-wrapper";
import ArrowText from "./arrow-text";
import { FONT_EN } from "@/styles/fonts";

const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [startX, setStartX] = useState(0);

  const changeIndex = (endX: number) => {
    if (startX + 100 < endX) {
      setIndex((index + 1) % images.length);
    }
  };

  return (
    <div className={`relative group`}>
      {images.map((image, i) => {
        const distance = (i - index + images.length) % images.length;
        const x = distance * 30;
        const scale = 1 - distance * 0.2;
        const rotate = distance * 4;
        return (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={(_, info) => setStartX(info.offset.x)}
            onDragEnd={(_, info) => changeIndex(info.offset.x)}
            key={i}
            className={"absolute inset-0 w-full h-full origin-bottom-right"}
            animate={{
              opacity: 1,
              x: x,
              scale: scale,
              rotate: rotate,
              zIndex: 99 - distance,
            }}
          >
            <ImageWrapper src={image} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageSlider;

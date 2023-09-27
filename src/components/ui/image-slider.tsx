import { motion } from "framer-motion";
import { useState } from "react";
import ImageWrapper from "./image-wrapper";

interface ImageSliderProps {
  images: string[];
  setIndex: (index: number) => void;
  index: number;
}

const ImageSlider = ({ images, setIndex, index }: ImageSliderProps) => {
  const [startX, setStartX] = useState(0);

  const changeIndexFromDrag = (endX: number) => {
    if (startX + 100 < endX) {
      if (index >= images.length) {
        setIndex(0);
        return;
      }
      setIndex((index + 1) % images.length);
    }
  };
  const changeIndexFromClick = (selectedIndex: number) => {
    if (selectedIndex >= images.length) {
      setIndex(0);
      return;
    }
    setIndex(selectedIndex);
  };

  return (
    <div className={`relative group mt-8`}>
      {images.map((image, i) => {
        const distance = (i - index + images.length) % images.length;
        const x = distance * 10;
        const scale = 1 - distance * 0.2;
        const rotate = distance * 4;
        return (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={(_, info) => setStartX(info.offset.x)}
            onDragEnd={(_, info) => changeIndexFromDrag(info.offset.x)}
            onClick={() => changeIndexFromClick(i + 1)}
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

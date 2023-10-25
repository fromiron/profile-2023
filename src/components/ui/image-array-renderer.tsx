import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

import Image from "next/image";
import { useState } from "react";
import MasonryWrapper from "./masonry-wrapper";
import { Button } from "./button";

type ImageProps = {
  alt: string;
  src: string;
  title: string;
};

export default function ImageArrayRenderer({
  images,
}: {
  images: ImageProps[];
}) {
  const [showImage, setShowImage] = useState({
    src: "",
    title: "",
    alt: "",
    index: 0,
  });

  const length = images.length;

  const exitGallery = () =>
    setShowImage({ src: "", title: "", alt: "", index: 0 });

  const prevImage = () => {
    if (showImage.index === 0) {
      setShowImage({ ...images[length - 1], index: length - 1 });
    } else {
      setShowImage({
        ...images[showImage.index - 1],
        index: showImage.index - 1,
      });
    }
  };

  const nextImage = () => {
    if (length - 1 === showImage.index) {
      setShowImage({ ...images[0], index: 0 });
    } else {
      setShowImage({
        ...images[showImage.index + 1],
        index: showImage.index + 1,
      });
    }
  };

  return (
    <>
      {showImage.src && (
        <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-foreground/20 backdrop-blur-sm">
          <div
            className="absolute bottom-0 right-0 top-0 z-[9999] flex cursor-pointer items-center px-2"
            onClick={nextImage}
          >
            <Button variant={"ghost"} size={"icon"}>
              <MdOutlineNavigateNext className="h-8 w-8" />
            </Button>
          </div>
          <div
            className="absolute bottom-0 left-0 top-0 z-[9999] flex cursor-pointer items-center px-2"
            onClick={prevImage}
          >
            <Button variant={"ghost"} size={"icon"} className="select-none">
              <MdOutlineNavigateBefore className="h-8 w-8" />
            </Button>
          </div>
          <Image
            className="z-[9999] max-h-[80%] w-auto max-w-[80%] rounded-lg shadow-2xl"
            src={showImage.src}
            alt={showImage.alt}
            width={800}
            height={800}
          />
          <div
            className="group absolute inset-0 z-50 flex h-screen w-full justify-center "
            onClick={exitGallery}
          >
            <div className="absolute top-0 z-[997] flex h-24 w-14 -translate-y-full items-end justify-center rounded-b-full bg-primary pb-4 shadow-lg transition group-hover:-translate-y-0">
              <IoCloseCircleSharp className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
        </div>
      )}

      <MasonryWrapper>
        {images.map((_image, i) => (
          <div
            key={i}
            className="group relative cursor-pointer overflow-hidden rounded-lg border"
            onClick={() =>
              setShowImage({
                src: _image.src,
                title: _image.title,
                alt: _image.alt,
                index: i,
              })
            }
          >
            <div className="group absolute inset-0 flex items-center justify-center  text-sm">
              <div className="bg-background/50 px-6 py-3 font-medium text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                {_image.title}
              </div>
            </div>
            <Image
              key={i}
              alt="asd"
              src={_image.src}
              className="m-0 block h-auto w-full object-cover object-center p-0"
              width={400}
              height={400}
            />
          </div>
        ))}
      </MasonryWrapper>
    </>
  );
}

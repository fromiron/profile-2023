const ImageWrapper = ({ src }: { src: string }) => {
  return (
    <>
      <svg
        viewBox="0 0 442 431"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="image-mask">
            <path
              fill="white"
              d="M0.328029 53.0725C-1.41261 22.1761 25.0464 -2.86661 55.8004 0.569278L375.16 36.2486C399.371 38.9535 418.109 58.7143 419.524 83.0351L436.692 378.096C438.362 406.803 415.532 431 386.776 431H68.8821C42.3605 431 20.4531 410.292 18.9613 383.812L0.328029 53.0725Z"
            />
          </mask>
        </defs>
        <image
          mask="url(#image-mask)"
          href={src}
          width={"100%"}
          height={"100%"}
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    </>
  );
};

export default ImageWrapper;

import { Noto_Sans_JP, Outfit } from "next/font/google";

const NOTO_SANS_JP = Noto_Sans_JP({
  weight: ["200", "400"],
  subsets: ["latin"],
  display: "swap",
});

const OUTFIT = Outfit({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin"],
  display: "swap",
});

const FONT_JP = NOTO_SANS_JP.className;
const FONT_EN = OUTFIT.className;

export { FONT_JP, FONT_EN };

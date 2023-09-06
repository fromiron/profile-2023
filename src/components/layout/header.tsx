import Link from "next/link";
import Logo from "../svg/logo";
import Navigation from "../navigation";
import { FONT_EN } from "@/styles/fonts";

export const HEADER_HEIGHT = "80px";

const Header = () => {
  return (
    <header
      className={`fixed ${FONT_EN} py-4 bg-background left-0 right-0 header-h z-[9997]`}
    >
      <nav className="flex flex-col lg:flex-row justify-between items-center h-full max-w-screen-xl mx-auto px-8">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;

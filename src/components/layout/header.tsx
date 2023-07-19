import Link from "next/link";
import Logo from "../svg/logo";
import Navigation from "../navigation";
import { FONT_EN } from "@/styles/fonts";

export const HEADER_HEIGHT = "80px";

const Header = () => {
  return (
    <header className={`fixed w-full ${FONT_EN} header-h z-40`}>
      <nav className="flex justify-between items-center bg-background h-full w-full max-w-screen-xl mx-auto px-8">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;

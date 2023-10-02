import Link from "next/link";
import Logo from "../svg/logo";
import Navigation from "../navigation";
import { FONT_EN } from "@/styles/fonts";

export const HEADER_HEIGHT = "80px";

const Header = () => {
  return (
    <header
      className={`fixed ${FONT_EN} header-h left-0 right-0 z-[9997] bg-background py-4`}
    >
      <nav className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between px-8 lg:flex-row">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;

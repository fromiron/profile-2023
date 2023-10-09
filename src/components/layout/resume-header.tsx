import Link from "next/link";
import Logo from "../svg/logo";
import ResumeNavigation from "../resume-navigation";
import { FONT_EN } from "@/styles/fonts";

export const HEADER_HEIGHT = "80px";

const ResumeHeader = () => {
  return (
    <header
      className={`fixed ${FONT_EN} header-h left-0 right-0 z-[9997] bg-background py-4`}
    >
      <nav className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between px-8 lg:flex-row">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
        <ResumeNavigation />
      </nav>
    </header>
  );
};

export default ResumeHeader;

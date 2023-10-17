import { FONT_EN } from "@/styles/fonts";
import Logo from "../svg/logo";
import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className={`${FONT_EN} mt-24 w-full bg-secondary`}>
      <div className="mx-6 pt-8 text-center">
        <h5 className="mb-2 uppercase">
          <span className="font-semibold text-primary">Thank you</span>
          <span className="font-normal"> for visiting</span>
        </h5>
      </div>
      <div className="mx-auto mb-2 grid w-fit grid-cols-3 gap-x-4">
        <a href="/">
          <Button
            variant={"ghost"}
            className="group w-full border border-transparent transition-colors duration-500 hover:border hover:border-primary"
          >
            Top
            <div className="ml-1 mt-auto aspect-square h-[6px] w-[6px] rounded-full bg-gray transition-colors duration-500 group-hover:bg-primary" />
          </Button>
        </a>
        <Link href="/profile">
          <Button
            variant={"ghost"}
            className="group w-full border border-transparent transition-colors duration-500 hover:border hover:border-primary"
          >
            Profile
            <div className="ml-1 mt-auto aspect-square h-[6px] w-[6px] rounded-full bg-gray transition-colors duration-500 group-hover:bg-primary" />
          </Button>
        </Link>
        <Link href="/works">
          <Button
            variant={"ghost"}
            className="group w-full border border-transparent transition-colors duration-500 hover:border hover:border-primary"
          >
            Works
            <div className="ml-1 mt-auto aspect-square h-[6px] w-[6px] rounded-full bg-gray transition-colors duration-500 group-hover:bg-primary" />
          </Button>
        </Link>
      </div>

      <div className="mx-auto w-4/5 border-b border-secondary-foreground/20" />
      <div className="flex items-center justify-center p-6">
        <span>© 2023 Copyright</span>
        <a className="mx-3" href="#">
          <Logo />
        </a>
        <a href="mailto:artless1112@gmail.com">artless1112@gmail.com</a>
      </div>
    </footer>
  );
};

export default Footer;

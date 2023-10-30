"use client";
import Link from "next/link";
import Logo from "../svg/logo";
import Navigation from "../navigation";
import { FONT_EN } from "@/styles/fonts";
import { motion } from "framer-motion";

export const HEADER_HEIGHT = "80px";

const Header = () => {
  return (
    <header
      className={`fixed top-0 ${FONT_EN} header-h left-0 right-0 z-[9997] bg-background py-4`}
    >
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="mx-auto flex h-full max-w-screen-xl flex-col items-center justify-between px-8 lg:flex-row"
      >
        <Link href="/" className="cursor-pointer">
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1 }}
          >
            <Logo />
          </motion.div>
        </Link>
        <Navigation />
      </motion.nav>
    </header>
  );
};

export default Header;

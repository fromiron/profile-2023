import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ScrollProgressBar from "@/components/ui/scroll-progress-bar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { FONT_JP } from "@/styles/fonts";
import ThemeSelector from "@/components/ui/theme-selector";
import Providers from "../providers";
import ResumeHeader from "@/components/layout/resume-header";
import PageChanger from "@/components/ui/page-changer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ja"
      className="w-full overflow-x-hidden scroll-smooth"
      suppressHydrationWarning={true}
    >
      <body className={FONT_JP}>
        <Providers>
          <ThemeSelector />
          <ScrollProgressBar />
          <ResumeHeader />
          <PageChanger />
          <main className="container max-w-screen-xl overflow-x-hidden lg:overflow-x-visible">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

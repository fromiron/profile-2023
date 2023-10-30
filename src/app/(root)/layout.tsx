import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ScrollProgressBar from "@/components/ui/scroll-progress-bar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { FONT_JP } from "@/styles/fonts";
import Providers from "../providers";
import PageChanger from "@/components/ui/page-changer";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import ThemeSelector from "@/components/ui/theme-selector";

export const metadata: Metadata = {
  title: "j.lee - I'm Web Developer",
  description: "Design & Develop! ユーザー経験中心のフロントエンド開発者",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ja"
      className="w-full overflow-x-hidden scroll-smooth"
      suppressHydrationWarning={true}
    >
      <Head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </Head>
      <body className={FONT_JP}>
        <Providers>
          <ThemeSelector />

          <ScrollProgressBar />
          <Header />
          <PageChanger />

          <main className="container max-w-screen-xl overflow-x-hidden lg:overflow-x-visible">
            {children}
          </main>

          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

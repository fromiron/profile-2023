"use client";
import TypingText from "@/components/ui/typing-text";
import useViewportAction from "@/hooks/useViewportAction";
import useNavigationStore from "@/store/navigation-store";
import { FONT_EN, FONT_JP } from "@/styles/fonts";
import { useRef } from "react";

const textList = [
  "Hello, Japan!",
  "Hello, Tokyo!",
  "I'm J.Lee",
  "<React suki={true}/>",
  "<WebDesign suki={true}/>",
  "<Nebou suru={false}/>",
  "<Sake suki={true}/>",
  'type FavoriteFoods="chicken"|"samgyeopsal"|"ramen"',
];
export default function AboutSection() {
  const { setActiveLink } = useNavigationStore();
  const targetRef = useRef(null);
  const onViewportEnter = () => {
    setActiveLink("/#about");
  };
  useViewportAction({ callback: onViewportEnter, ref: targetRef });
  return (
    <section
      ref={targetRef}
      id="about"
      className="relative flex flex-col items-center justify-center font-light"
    >
      <div className="w-fit break-keep text-8xl text-gray-light dark:text-opacity-10 lg:text-[240px]">
        <div className="relative -z-10 -translate-x-1/3 -translate-y-10 select-none">
          こんにちは
        </div>
        <div
          className={`mx-auto break-all text-center text-5xl text-primary lg:text-6xl ${FONT_EN}`}
        >
          <TypingText textList={textList} />
        </div>
        <div className="relative -z-10 translate-x-1/3 translate-y-10 select-none">
          にっぽん
        </div>
      </div>
      <TextArea />
    </section>
  );
}

function TextArea() {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-4 lg:grid-cols-2 ${FONT_JP} whitespace-pre-line`}
    >
      <p>
        {` 札幌で現在の日本人の妻と出会い、日本生活8年目のWeb開発者イジョンチョルと申します。

        高校生の時からデザインに興味を持ちウェブデザイン資格証を取得し、大学でもデザインを専攻してWebと印刷出版などの媒体での視覚的要素のユーザー経験を主に扱いました。

        卒業後には出版社・旅行会社でWeb・出版のディレクションを担当しました。この過程で得たActionScript・JavaScriptなどの知識と経験は来日直後には活かすことができずブランクになりましたが、この期間はホテル業界で日本でのビジネスにおける言葉やマナーを身に着ける時間になりました。`}
      </p>

      <p>
        {` その数年感で他国での暮らしやビジネスに自身が付き、再びWeb業界に飛び込みまして開発者としての日本生活は4年目を向かっております。

        現在はDesign・Front-endをメインにしてBack-end、App開発の業務もしておりますが、心ときめく挑戦のチャンスはいつも

        よろこんで！`}
      </p>
    </div>
  );
}

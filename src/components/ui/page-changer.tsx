"use client";
import makeDelay from "@/lib/makeDelay";
import { useEffect, useState } from "react";
import { Button } from "./button";
import useFirstVisitStore from "@/store/first-visit-store";
import { cn } from "@/lib/utils";
import { AiOutlineCaretUp } from "react-icons/ai";
import { Badge } from "./badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const PageChanger = () => {
  const { isFirstVisit } = useFirstVisitStore();
  const [focus, setFocus] = useState(false);
  const [path, setPath] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(true);
  const pathname = usePathname();
  const focusOut = () => setFocus(false);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const handleFocusIn = () => {
    setFocus(true);
  };
  const handleFocusOut = async () => {
    if (focus) {
      await makeDelay(7000);
      focusOut();
    }
  };

  useEffect(() => {
    async function setShowBubbleAsync() {
      if (!isFirstVisit) {
        await makeDelay(7000);
        setShowBubble(false);
      }
    }
    setShowBubbleAsync();
  }, [isFirstVisit]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={handleFocusIn}
      onMouseLeave={handleFocusOut}
      className={`fixed right-0 top-[1rem] z-[9998] rounded-l-lg bg-primary p-2 ${
        focus ? "translate-x-0" : "translate-x-[90%]"
      } cursor-pointer transition-transform duration-500`}
    >
      <div
        className={cn(
          "absolute -left-2 bottom-0 top-0 -translate-x-full",
          showBubble && isFirstVisit
            ? "opacity-100"
            : "opacity-0 transition-opacity",
        )}
      >
        <div className="flex h-full items-center">
          <Badge variant={"destructive"} className="font-normal">
            履歴書に移動
          </Badge>

          <div className="rotate-90">
            <AiOutlineCaretUp className="animate-bounce text-destructive" />
          </div>
        </div>
      </div>
      <Link href={path === "/" ? "/profile" : "/"}>
        <Button
          variant="ghost"
          size="default"
          className=" text-xs font-medium text-secondary focus-visible:ring-transparent"
        >
          {path === "/" ? "履歴ページ" : "メインページ"}
        </Button>
      </Link>
    </motion.div>
  );
};

export default PageChanger;

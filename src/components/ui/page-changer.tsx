"use client";
import makeDelay from "@/lib/makeDelay";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const PageChanger = () => {
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
      await makeDelay(4000);
      setShowBubble(false);
    }
    setShowBubbleAsync();
  }, [showBubble]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={handleFocusIn}
        onMouseLeave={handleFocusOut}
        className={`fixed right-0 top-[1rem] z-[9998] rounded-l-lg bg-primary p-2 ${
          focus ? "translate-x-0" : "translate-x-[90%]"
        } cursor-pointer transition-transform duration-500`}
      >
        <Link href={path === "/" ? "/profile" : "/"} className="relative">
          <Button
            variant="ghost"
            size="default"
            className="text-xs font-medium text-secondary focus-visible:ring-transparent"
          >
            {path === "/" ? "履歴ページ" : "メインページ"}
          </Button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: showBubble ? 1 : 0,
          display: showBubble ? "block" : "none",
          transition: { delay: 1 },
        }}
        className="fixed right-2 top-[5rem] z-[9998]"
      >
        <Badge variant={"outline"}>ページ移動 ↑</Badge>
      </motion.div>
    </>
  );
};

export default PageChanger;

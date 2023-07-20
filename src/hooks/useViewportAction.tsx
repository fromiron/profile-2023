/**
 * エレメントとビューポートの交差をチェックし、交差したときにコールバック関数を実行する。
 * @param callback - 観測された要素がビューポートと交差するときに呼び出される関数
 * @param threshold - コールバックのトリガーに必要な要素の可視性のパーセンテージを示す0から1の間の数値。デフォルトは0.5。
 * @param rootMargin - ルート要素のバウンディングボックス周りのマージンを表す文字列。デフォルトは "0px"。
 * @param ref - 観測する要素を指すReact refオブジェクト。
 * @returns 要素を観察するために使用されるIntersectionObserverインスタンスを含むオブジェクト。
 */

import { useEffect, useRef } from "react";

interface UseViewportActionProps {
  callback: () => void;
  threshold?: number;
  rootMargin?: string;
  ref: React.RefObject<Element | null>;
}

const useViewportAction = ({
  callback,
  threshold = 0.5,
  rootMargin = "0px",
  ref,
}: UseViewportActionProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: rootMargin,
      threshold: threshold,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, threshold, rootMargin, ref]);

  return { observerRef };
};

export default useViewportAction;

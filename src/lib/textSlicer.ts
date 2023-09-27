/**
 * 与えられたテキスト文字列を、指定されたインデックスで分割します。
 * @param text - 分割する文字列
 * @param splitIndex - 文字列を分割するインデックス
 * @returns 分割インデックスまでの文字列と，分割インデックス以降の文字列の2つの要素を含む配列
 */
const textSplitter = (text: string, splitIndex: number) => {
  return splitIndex < 0 || splitIndex >= text.length
    ? [text, ""]
    : [text.slice(0, splitIndex), text.slice(splitIndex)];
};

export default textSplitter;

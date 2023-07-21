/**
 * 関数の実行を指定された時間遅延する。
 * @param ms 遅延時間、milliseconds
 * @param fn 実行する関数
 */
export default async function makeDelay(
  ms: number,
  fn?: () => void
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
  if (fn) {
    fn();
  }
}

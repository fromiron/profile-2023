const japanDate = (originalDate: string) => {
  const date = new Date(originalDate);
  const japaneseDate = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);

  return japaneseDate;
};

export default japanDate;

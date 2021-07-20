export function calculateReadTime(content): string {
  const wordsPerMinute = 200;
  let resultReadTime = 0;
  content.forEach((item) => {
    item.content?.forEach((c) => {
      if (c.text !== undefined) {
        const wordsLength = c.text.split(" ").length as number;
        if (wordsLength > 0) {
          const value: number = wordsLength / wordsPerMinute;
          resultReadTime += value;
        }
      }
    });
  });

  const resultText = `${Math.ceil(resultReadTime)} min read`;

  return resultText;
}

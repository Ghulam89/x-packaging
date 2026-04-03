type BlogQna = { question?: string; answer?: string };

/** FAQPage JSON-LD when the blog has Q&A blocks (matches legacy SingleBlog.jsx). */
export function blogFaqPageSchema(
  qna: BlogQna[] | undefined | null
): Record<string, unknown> | null {
  if (!qna?.length) return null;
  const mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }> = [];
  for (const item of qna) {
    const name = typeof item.question === "string" ? item.question.trim() : "";
    const text =
      typeof item.answer === "string"
        ? item.answer.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
        : "";
    if (!name || !text) continue;
    mainEntity.push({
      "@type": "Question",
      name,
      acceptedAnswer: {
        "@type": "Answer",
        text,
      },
    });
  }
  if (!mainEntity.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

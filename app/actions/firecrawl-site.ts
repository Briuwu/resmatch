"use server";

import FireCrawlApp from "@mendable/firecrawl-js";

export async function scrapeSite(url: string) {
  const app = new FireCrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  const scrapeResult = await app.scrapeUrl(url, {
    formats: ["markdown"],
    onlyMainContent: true,
    includeTags: [".resultContent"],
  });

  if (scrapeResult.error) {
    throw new Error(scrapeResult.error);
  }

  if ("markdown" in scrapeResult) {
    return scrapeResult.markdown;
  }

  throw new Error("Failed to get markdown from scrape result");
}

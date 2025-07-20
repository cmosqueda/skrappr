import { JSDOM } from "jsdom";

export const extractPreviewMeta = async (url: string) => {
  const html = await fetch(url).then((res) => res.text());
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector("title")?.textContent || "";

  const description = doc.querySelector("meta[name='description']")?.getAttribute("content") || "";
  const image = doc.querySelector("meta[property='og:image']")?.getAttribute("content") || "";

  return { title, description, image };
};

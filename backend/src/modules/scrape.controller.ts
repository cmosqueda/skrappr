import { Request, Response } from "express";
import { loadPageHTML, scrapePageContent } from "./puppeteer.service";
import { extractPreviewMeta } from "../utils/scrapePreviewMeta";

// POST api/scrape/preview
export const getPreviewHTML = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const html = await loadPageHTML(url);
    res.status(200).json({ html });
  } catch (error) {
    console.error("[Preview Error]", error);
    res.status(500).json({ error: "Failed to load preview" });
  }
};

// POST api/scrape/preview-meta
export const getPreviewMeta = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const preview = await extractPreviewMeta(url);
    res.status(200).json(preview); // return safe preview metadata
  } catch (error) {
    console.error("[Preview Meta Error]", error);
    res.status(500).json({ error: "Failed to load preview metadata" });
  }
};

// POST api/scrape/data
export const getScrapedData = async (req: Request, res: Response) => {
  const { url, selectors } = req.body;

  if (!url || !Array.isArray(selectors)) {
    return res.status(400).json({ error: "URL and selectors are required" });
  }

  try {
    const data = await scrapePageContent(url, selectors);
    res.status(200).json({ data });
  } catch (error) {
    console.error("[Scrape Error]", error);
    res.status(500).json({ error: "Failed to scrape content" });
  }
};

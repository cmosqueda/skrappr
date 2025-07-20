import express from "express";
import { getPreviewHTML, getPreviewMeta, getScrapedData } from "./scrape.controller";

const scrapeRouter = express.Router();

scrapeRouter.post("/preview", getPreviewHTML); // accepts { url: string }
scrapeRouter.post("/preview-meta", getPreviewMeta); // accepts { url: string }
scrapeRouter.post("/data", getScrapedData); // accepts { url: string, selectors: string[] }

export default scrapeRouter;

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchPreviewHTML = async (url: string) => {
  const res = await axios.post(`${API_BASE}/api/scrape/preview`, { url });
  return res.data;
};

export const fetchPreviewMeta = async (url: string) => {
  const res = await axios.post(`${API_BASE}/api/scrape/preview-meta`, { url });
  return res.data;
};

export const fetchScrapedData = async (url: string, selectors: string[]) => {
  const res = await axios.post(`${API_BASE}/api/scrape/data`, { url, selectors });
  return res.data;
};

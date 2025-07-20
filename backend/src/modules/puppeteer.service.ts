import puppeteer, { Browser } from "puppeteer";
import { injectSelectorPickerScript } from "../utils/injectSelectorPickerScript";

const getBrowser = async (): Promise<Browser> => {
  return await puppeteer.launch({
    headless: process.env.HEADLESS === "false" ? false : true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

// export const loadPageHTML = async (url: string): Promise<string> => {
//   const browser = await getBrowser();
//   const page = await browser.newPage();

//   try {
//     await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
//     const html = await page.content();
//     return html;
//   } finally {
//     await browser.close();
//   }
// };

export const loadPageHTML = async (url: string): Promise<string> => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    let html = await page.content();

    // Inject selector picker script
    // Append the script before </body>
    html = html.replace("</body>", `${injectSelectorPickerScript}</body>`);

    return html;
  } finally {
    await browser.close();
  }
};

export const scrapePageContent = async (url: string, selectors: string[]): Promise<Record<string, string[]>> => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

    const data: Record<string, string[]> = {};

    for (const selector of selectors) {
      const elements = await page.$$eval(selector, (els) =>
        els.map((el) => {
          if (el instanceof HTMLImageElement) return el.src;
          if (el instanceof HTMLAnchorElement) return el.href;
          return el.textContent?.trim() || "";
        })
      );
      data[selector] = elements;
    }

    return data;
  } catch (error) {
    console.error("[Puppeteer Error]", error);
    throw new Error("Failed to scrape content");
  } finally {
    await browser.close();
  }
};

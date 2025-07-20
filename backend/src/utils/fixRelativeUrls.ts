// cheerio, not used atm

import { CheerioAPI } from "cheerio";

export const fixRelativeUrls = ($: CheerioAPI, baseUrl: string): void => {
  const fixAttr = (selector: string, attr: string) => {
    $(selector).each((_, el) => {
      const val = $(el).attr(attr);
      if (val && val.startsWith("/")) {
        $(el).attr(attr, new URL(val, baseUrl).href);
      }
    });
  };

  fixAttr("link[href]", "href");
  fixAttr("a[href]", "href");
  fixAttr("script[src]", "src");
  fixAttr("img[src]", "src");
  fixAttr("iframe[src]", "src");
  fixAttr("source[src]", "src");
  fixAttr("video[src]", "src");
  fixAttr("audio[src]", "src");
};

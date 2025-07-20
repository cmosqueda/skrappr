import { useState } from "react";
import UrlForm from "@/components/UrlForm";
// import ScrapedResults from "@/components/ScrapedResults";
// import { fetchPreviewHTML, fetchPreviewMeta, fetchScrapedData } from "@/services/api";
import { fetchPreviewHTML } from "@/services/api";
import PreviewDisplay from "@/components/PreviewDisplay";
// import axios from "axios";

export default function Home() {
  // const [scrapedData, setScrapedData] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const handleUrlSubmit = async (url: string) => {
    try {
      setUrl(url);
      const preview = await fetchPreviewHTML(url);
      console.log("Response received:", preview);

      if (preview.html) {
        setHtmlContent(preview.html);
      } else {
        console.error("Response format incorrect:", preview);
      }
    } catch (err) {
      console.error("Error fetching preview HTML:", err);
    }
  };

  // const handleScrape = async (selectors: string[]) => {
  //   const data = await fetchScrapedData(url, selectors);
  //   setScrapedData(data);
  // };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen w-full py-30 px-5 space-y-10 ">
        {/* section hero ??? */}
        <div className="items-center justify-center text-center space-y-2">
          {/* pwede gyapun span */}
          <p className="text-4xl font-bold">skrappr</p>
          <p className="italic text-lg">A tool made for scraping website data</p>
        </div>
        {/* input box */}
        <UrlForm onSubmit={handleUrlSubmit}></UrlForm>

        {/* display preview */}
        {/* html content */}
        {htmlContent && (
          <PreviewDisplay
            htmlContent={htmlContent}
            onElementSelect={(selector) => {
              console.log("Selector picked:", selector);
            }}
          />
        )}

        {/* web view box */}
      </div>
    </>
  );
}

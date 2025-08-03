import { useRef, useState } from "react";
import UrlForm from "@/components/UrlForm";
import PreviewDisplay from "@/components/PreviewDisplay";
import { fetchPreviewHTML } from "@/services/api";

export default function Home() {
  const [htmlContent, setHtmlContent] = useState("");
  const [selectors, setSelectors] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleUrlSubmit = async (url: string) => {
    try {
      const response = await fetchPreviewHTML(url);
      setHtmlContent(response.html); // assuming API returns { html: string }
      setSelectors([]); // reset selections when new page is loaded
    } catch (error) {
      console.error("Failed to fetch preview", error);
    }
  };

  const handleElementSelect = (selector: string) => {
    setSelectors((prev) => (prev.includes(selector) ? prev : [...prev, selector]));
  };

  const toggleSelection = () => {
    const enabled = !isSelecting;
    setIsSelecting(enabled);

    // Send message to iframe to enable/disable selection
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "TOGGLE_SELECT_MODE",
        enabled,
      },
      "*"
    );
  };

  const clearSelections = () => {
    setSelectors([]);
    iframeRef.current?.contentWindow?.postMessage({ type: "CLEAR_SELECTIONS" }, "*");
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-10 px-5 space-y-6">
      <div className="text-center">
        <p className="text-4xl font-bold">skrappr</p>
        <p className="italic text-lg">A tool made for scraping website data</p>
      </div>

      <UrlForm onSubmit={handleUrlSubmit} />

      {htmlContent && (
        <PreviewDisplay htmlContent={htmlContent} onElementSelect={handleElementSelect} iframeRef={iframeRef} />
      )}

      {selectors.length > 0 && (
        <div className="w-full max-w-3xl bg-white shadow border rounded p-4">
          <p className="font-semibold mb-2">Selected Elements:</p>
          <ul className="list-disc list-inside text-sm text-gray-800">
            {selectors.map((sel, idx) => (
              <li key={idx}>{sel}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button onClick={toggleSelection} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {isSelecting ? "Disable Select Mode" : "Enable Select Mode"}
        </button>
        <button onClick={clearSelections} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          Clear Selection
        </button>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";

interface PreviewDisplayProps {
  htmlContent: string;
  onElementSelect?: (selector: string) => void; // optional callback
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ htmlContent, onElementSelect }) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "ELEMENT_SELECTED") {
        console.log("Selected selector:", event.data.selector);
        if (onElementSelect) {
          onElementSelect(event.data.selector);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onElementSelect]);

  return (
    <>
      <div className="sm:w-11/12 w-full flex flex-col items-center my-10 space-y-3">
        <div className="flex items-center flex-wrap w-full gap-2 px-4 py-2 bg-gray-100 border rounded-lg border-gray-300 overflow-auto">
          <button className="px-3 py-1 text-sm font-medium bg-white border rounded hover:bg-gray-50">Select</button>
          <button className="px-3 py-1 text-sm font-medium bg-white border rounded hover:bg-gray-50">
            Clear Selection
          </button>
        </div>

        <iframe
          srcDoc={htmlContent}
          sandbox="allow-same-origin allow-scripts"
          className="w-full h-[600px] border border-neutral-600 rounded-lg bg-white"
          title="Website Preview"
        />
      </div>
    </>
  );
};

export default PreviewDisplay;

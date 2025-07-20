import { useState } from "react";

export default function UrlForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) onSubmit(url);
  };

  return (
    <>
      <div className="flex flex-col w-5/6 sm:w-lg items-center space-y-5 border p-5 rounded-md bg-amber-50">
        {/* input field and button */}
        <form className="flex flex-row space-x-2 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-white px-3 py-2 border rounded-s-lg rounded-e-sm w-full"
          />
          <button type="submit" className="bg-amber-300 px-3 py-2 border rounded-e-lg rounded-s-sm">
            Go
          </button>
        </form>
        <span>
          <p className="italic text-center text-sm sm:text-base text-black/70">
            Get started by pasting a website URL above.
          </p>
        </span>
      </div>
    </>
  );
}

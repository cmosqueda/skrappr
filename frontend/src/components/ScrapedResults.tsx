export default function ScrapedResults({ data }: { data: string[] }) {
  return (
    <>
      <div>
        <h2>Scraped Results</h2>
        <ul>
          {data.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

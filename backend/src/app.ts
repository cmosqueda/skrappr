import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scrapeRouter from "./modules/scrape.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// for scraping
app.use("/api/scrape", scrapeRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

# skrappr

**What is skrappr?**

**skrappr** is a simple web scraper web app for practicing web scraping (and a bit of backend).

Backend here may be a bit of overkill as this app's use case is only (and initially) intended for scraping data. I thought everything can be packed inside a single directory (like a monolithic type) and call it a day but instead I decided to separate both frontend and backend directories because of my current obsession with _modularity_ and _clean design_ and i wanna maximize everything just to learn it all (even if it means overcomplicating such simple stuff).

**Stuff you can do with skrappr:**

- view a website's dom content
- interact with the preview display, pick any elements you want to scrape
- save scraped data in csv and json formats (for now)

## Stacks (Node + TS)

**Backend:**

- Express
- Puppeteer

**Frontend:**

- React with Vite
- Tailwind css
- axios

## Directory Structure

Inside the root directory are subdirectories `frontend` and `backend`. This is to separate logic and concerns among the two.

```
root/
  - backend/
  - frontend/
```

## Trying skrappr On Your Local Device

1. Fork this repo and clone your forked repo into your local device.
2. Open a terminal and access `frontend` using command `cd frontend`. You are now inside the frontend. Install the node modules by entering the command `npm i`.
3. Open another terminal and do the same thing for `backend`.
4. Create and sep up the .env files inside both frontend and backend.
   Inside the `frontend` directory, create .env file and put these variables inside the .env file:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

   Do the same thing inside the `backend` directory. Create a .env file and populate these variables:

   ```
   PORT=5000
   HEADLESS=true
   ```

5. Go back to the terminal where you accessed frontend. Run the vite server by entering `npm run dev`.
6. Go back to the terminal where you accessed backend. Run the express server by entering `npm run dev`.
7. App is now running. Access the frontend server in your browser.

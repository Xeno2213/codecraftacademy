# CodeCraft Academy

A responsive coding-learning site for C#, C++, Python, HTML, JavaScript, and TypeScript.

## Run locally
1. Install Node.js 20 or newer.
2. In this folder run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.
4. Run `npm run build` to verify the production build.

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Keep the detected Vite settings: build command `npm run build`, output directory `dist`.
4. Click **Deploy**. `vercel.json` is included for SPA routing.

Lessons, quiz scores, selected language, and progress are saved in the browser's localStorage. The in-page playground is a learning preview; it does not compile C#/C++/Python or execute arbitrary code. HTML/CSS/JavaScript examples are previewed safely as text rather than injected into the page.

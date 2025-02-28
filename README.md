# Trivia SPA

This is a small React single‐page application built with Vite, demonstrating routing (via React Router v7+), data fetching with a custom hook, and responsive design.

## Features

* **Home Page**: Displays a hero section with a link to the trivia game and a random “useless fact.”
* **Trivia Page**: Fetches multiple‐choice questions from an external API and tracks the user’s score.
* **Deploy Page**: Basic information on deploying to Netlify and Vercel.

## Getting Started

Install dependencies:
```sh
npm install
```
Run in development mode:
```
npm run dev
```
Build for production:
```
npm run build
```

## Deployment

**Netlify CLI:**
```
npm install -g netlify-cli
netlify login
netlify deploy --dir=dist
netlify deploy --prod --dir=dist
```

[Deployed site on Netlify](https://trivia-app-2025-02-28.netlify.app/)

**Vercel CLI:**
```
npm install -g vercel
vercel login
vercel --prod
```

[Deployed site on Vercel](https://react-trivia-app-pi.vercel.app/)

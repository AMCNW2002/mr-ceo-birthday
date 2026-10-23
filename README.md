# A birthday tribute

A responsive, single-page birthday experience built with React, Vite, Three.js, React Three Fiber, Drei, and GSAP. The hero features an animated procedural golden tree, followed by a personal message, an executive portrait gallery, and an interactive celebration.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, preview it with `npm run preview`, and check the project with `npm run lint`.

## Personalize the tribute

Edit the `celebration` object near the top of `src/App.jsx` to change the CEO's name, company name, title, birthday message, wishes, and sign-off. The company monogram and closing message update from those values.

Replace the sample portraits in `src/App.jsx` with local image paths:

```jsx
src="/images/ceo-1.jpg"
src="/images/ceo-2.jpg"
```

Add the corresponding files to `public/images/`. The gallery uses `object-fit: cover` to preserve each image's proportions; adjust `object-position` in `src/App.css` if needed to frame a particular portrait.

## Optional background music

Add an audio file at `public/music/ambient.mp3`. The visible sound toggle starts playback only after the visitor activates it; sound is never autoplayed. If the file is absent, the page explains how to enable it.

## Deployment

This is a standard Vite single-page app and can be deployed to Vercel or Netlify using the repository root as the project directory, `npm run build` as the build command, and `dist` as the publish directory. No server-side configuration is required.

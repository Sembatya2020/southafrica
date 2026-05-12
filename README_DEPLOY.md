# Deployment Guide for Netlify

Your project is fully configured and ready for deployment on Netlify.

## Option 1: Manual Upload (Easiest)
1. Go to your [Netlify Dashboard](https://app.netlify.com/).
2. Log in and go to the **"Sites"** tab.
3. Scroll to the bottom where it says **"Want to deploy a new site without connecting to Git?"**.
4. Drag and drop the `dist` folder from your project directory into that area.
5. Your site will be live in seconds!

## Option 2: Connect to GitHub/GitLab
If you want automatic updates every time you save your code:
1. Push your code to a GitHub repository.
2. In Netlify, click **"Add new site"** -> **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect the settings I've prepared in `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**.

## Project Configuration
- **Build Tool:** Vite
- **Main Entry:** `index.html`
- **Output Folder:** `dist`
- **Redirects:** 404 page is configured in `vite.config.js`.

Your site is now optimized, with the latest gold theme, fixed typography, and repositioned WhatsApp button.

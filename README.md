# Mochi's Art Site

A personal portfolio and art gallery for displaying Mochi's artwork.

**Live site:** [mochisart.com](https://mochisart.com/) - Hosted via CloudFlare

## Tech stack

- [Astro](https://astro.build/) - Static site framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Hosting and deployment adapter
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - Local preview and Cloudflare deployment tooling
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing

## Prerequisites

- [Node.js](https://nodejs.org/) 22.12.0 or newer
- npm

## Local setup

1. Clone the repository and enter the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the local development server:

   ```bash
   npm run dev
   ```

   Astro will generate the gallery data and make the site available locally.

## Available scripts

- `npm run dev` - Generate gallery data and start the Astro development server
- `npm run build` - Generate gallery data and build the production site into `dist`
- `npm run preview` - Build the site and preview it with Wrangler
- `npm run deploy` - Build and deploy the site to Cloudflare
- `npm run gen:gallery` - Generate gallery data
- `npm run generate-types` - Generate Wrangler type definitions

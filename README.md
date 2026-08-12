# Cavora React

Cavora's React 18 client, powered by Vite, Redux Toolkit Query, Material UI,
and TypeScript.

## Scripts

- `npm run dev` — start the local development server on port 3000
- `npm run build` — type-check and create the optimized production bundle
- `npm run preview` — preview the generated bundle locally
- `npm run images:verify` — validate WebP assets and static image references
- `npm run report:size` — report generated JavaScript and CSS bundle sizes

Set `VITE_API_URL` from `.env.example` to the public Cavora API URL before
building for deployment. Serve the generated `build/` directory from a static
host configured to fall back to `index.html` for client-side routes.

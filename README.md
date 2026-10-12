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

## Production Docker deployment

Copy `.env.production.example` to `.env` and set `VITE_API_URL` to the public
frontend origin plus `/cavora`. The bundled Nginx configuration proxies
`/cavora` and `/uploads` to the Cavora API on the shared Docker `edge` network,
so browser requests remain same-origin.

```sh
docker compose -p cavora-frontend -f compose.production.yml config
docker compose -p cavora-frontend -f compose.production.yml up -d --build
docker compose -p cavora-frontend -f compose.production.yml ps
```

For the domainless VPS deployment, terminate HTTPS for the public server IP at
the shared edge proxy, route it to `cavora-frontend:80`, and set:

```dotenv
VITE_API_URL=https://201.18.217.140/cavora
FRONTEND_BIND_HOST=127.0.0.1
FRONTEND_PUBLISHED_PORT=3101
```

The loopback port is for server-side health checks only. Users access the site
through the public HTTPS address, and Nginx proxies `/cavora` and `/uploads` to
the backend over the shared Docker network.

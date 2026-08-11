import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    /* Keeps the `app/...` and `css/...` imports resolving off the
       `baseUrl: "src"` already declared in tsconfig.json. */
    tsconfigPaths: true,
  },
  server: {
    /* The API only allows http://localhost:3000 as a CORS origin, so the dev
       server has to stay on that port rather than Vite's default 5173. */
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: "build",
  },
})

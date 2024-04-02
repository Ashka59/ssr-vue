import fs from 'node:fs/promises'
import express from 'express'
import {render} from "./server/entry-server.js";
import compression from "compression";
import serveStatic from "serve-static";
import {resolve} from "path";

// Constants
const port = process.env.PORT || 8080
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = await fs.readFile('./dist/client/index.html', 'utf-8');
const ssrManifest = await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8');

// Create http server
const app = express()

app.use(compression())

app.use(base, serveStatic(resolve("dist/client"), {
  index: false,
}))

app.get("/api/items", (req, res) => {
  res.send(["Laptop","Desktop"]);
});

// Serve HTML
app.use('*', async (req, res) => {
  const url = req.originalUrl.replace(base, '')

  const rendered = await render(url, ssrManifest)
  console.log("HTML", rendered.html)
  const html = templateHtml
      .replace(`<!--preload-links-->`, rendered.preloadLinks ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

  res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

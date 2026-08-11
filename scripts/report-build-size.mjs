import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import { gzipSync } from "node:zlib"

const buildRoot = path.resolve("build")
const html = await readFile(path.join(buildRoot, "index.html"), "utf8")
const initialAssets = [
  ...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g),
].map(match => match[1])

const measured = await Promise.all(
  initialAssets.map(async asset => {
    const contents = await readFile(path.join(buildRoot, asset))
    return {
      asset,
      rawBytes: contents.length,
      gzipBytes: gzipSync(contents, { level: 9 }).length,
    }
  }),
)

async function directoryBytes(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const sizes = await Promise.all(
    entries.map(async entry => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory()
        ? directoryBytes(entryPath)
        : (await stat(entryPath)).size
    }),
  )
  return sizes.reduce((total, size) => total + size, 0)
}

console.log(
  JSON.stringify(
    {
      initialAssets: measured,
      initialRawBytes: measured.reduce((total, file) => total + file.rawBytes, 0),
      initialGzipBytes: measured.reduce(
        (total, file) => total + file.gzipBytes,
        0,
      ),
      buildBytes: await directoryBytes(buildRoot),
    },
    null,
    2,
  ),
)

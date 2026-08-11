import { existsSync } from "node:fs"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map(entry => {
        const entryPath = path.join(directory, entry.name)
        return entry.isDirectory() ? walk(entryPath) : [entryPath]
      }),
    )
  ).flat()
}

const publicFiles = await walk(path.resolve("public"))
const webpFiles = publicFiles.filter(file => /\.webp$/i.test(file))
const metadata = await Promise.all(webpFiles.map(file => sharp(file).metadata()))
const invalidWebp = webpFiles.filter((_, index) => metadata[index].format !== "webp")

const sourceFiles = (await walk(path.resolve("src"))).filter(file =>
  /\.(?:css|ts|tsx)$/i.test(file),
)
const references = new Set()

for (const sourceFile of sourceFiles) {
  const source = await readFile(sourceFile, "utf8")
  for (const match of source.matchAll(/["'](\/img\/[^"']+\.webp)["']/g)) {
    references.add(match[1])
  }
}

const missing = [...references].filter(reference =>
  !existsSync(path.join("public", reference)),
)

console.log(
  JSON.stringify(
    {
      webpFiles: webpFiles.length,
      invalidWebp,
      staticReferences: references.size,
      missing,
    },
    null,
    2,
  ),
)

if (invalidWebp.length || missing.length) process.exitCode = 1

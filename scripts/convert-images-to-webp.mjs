import { readdir, stat, unlink } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const imageRoot = path.resolve("public/img")

async function findJpegs(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(entry => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? findJpegs(entryPath) : [entryPath]
    }),
  )

  return files.flat().filter(file => /\.jpe?g$/i.test(file))
}

const jpegFiles = await findJpegs(imageRoot)
let originalBytes = 0
let webpBytes = 0

for (const jpegPath of jpegFiles) {
  const webpPath = jpegPath.replace(/\.jpe?g$/i, ".webp")
  const { size: sourceSize } = await stat(jpegPath)

  const result = await sharp(jpegPath)
    .rotate()
    .webp({ quality: 80, effort: 5, smartSubsample: true })
    .toFile(webpPath)

  await unlink(jpegPath)
  originalBytes += sourceSize
  webpBytes += result.size
}

const saving = originalBytes
  ? ((1 - webpBytes / originalBytes) * 100).toFixed(1)
  : "0.0"

console.log(
  JSON.stringify(
    {
      converted: jpegFiles.length,
      originalBytes,
      webpBytes,
      savingPercent: Number(saving),
    },
    null,
    2,
  ),
)

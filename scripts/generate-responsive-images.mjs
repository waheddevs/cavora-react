import { readdir } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const slideRoot = path.resolve("public/img/slide-img")
const slides = (await readdir(slideRoot)).filter(file =>
  /^slide-\d+\.webp$/i.test(file),
)
const widths = [640, 1280]

for (const slide of slides) {
  const source = path.join(slideRoot, slide)
  await Promise.all(
    widths.map(width =>
      sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5, smartSubsample: true })
        .toFile(path.join(slideRoot, slide.replace(".webp", `-${width}.webp`))),
    ),
  )
}

console.log(`Generated ${slides.length * widths.length} responsive hero images.`)

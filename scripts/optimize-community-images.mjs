import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const inputDir = path.resolve('src/assets/community')
const outputDir = path.resolve('src/assets/community/optimized')

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png'])

fs.mkdirSync(outputDir, { recursive: true })

const files = fs
  .readdirSync(inputDir)
  .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))

let optimizedCount = 0
let skippedCount = 0

for (const file of files) {
  const inputPath = path.join(inputDir, file)
  const outputName = `${path.parse(file).name}.webp`
  const outputPath = path.join(outputDir, outputName)

  await sharp(inputPath)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 90,
      effort: 6,
    })
    .toFile(outputPath)

  const originalBytes = fs.statSync(inputPath).size
  const optimizedBytes = fs.statSync(outputPath).size

  const originalSizeMB = originalBytes / 1024 / 1024
  const optimizedSizeMB = optimizedBytes / 1024 / 1024

  if (optimizedBytes >= originalBytes) {
    fs.unlinkSync(outputPath)

    skippedCount++

    console.log(
      `SKIPPED ${file} | Original smaller (${originalSizeMB.toFixed(
        2,
      )}MB <= ${optimizedSizeMB.toFixed(2)}MB)`,
    )

    continue
  }

  optimizedCount++

  const savings = (
    ((originalBytes - optimizedBytes) / originalBytes) *
    100
  ).toFixed(1)

  console.log(
    `${file} → optimized/${outputName} | ${originalSizeMB.toFixed(
      2,
    )}MB → ${optimizedSizeMB.toFixed(2)}MB (${savings}% saved)`,
  )
}

console.log('')
console.log(`Optimized: ${optimizedCount}`)
console.log(`Skipped: ${skippedCount}`)
console.log(`Processed: ${files.length}`)
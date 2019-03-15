const fs = require('fs')
const path = require('path')
const globCb = require('glob')
const util = require('util')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFile)

const exif = require("jpeg-exif")

const options = {
  inputDir: './public/images/uploads',
  outputDir: './content/exifs',
  imageFormats: ['jpg', 'jpeg']
}

const saveExif = ({buffer, filename}) => {
  console.log(`🖼️  Reading EXIF ${filename}`)

  const data = exif.fromBuffer(buffer)
  const extname = path.extname(filename)
  const newFilename = `${path.basename(filename, extname)}.json`
  const outputFile = `${options.outputDir}/${newFilename}`
  data.filename = filename.replace('./public', '')

  const relevantData = {
    filename: filename.replace('./public', ''),
    FNumber: data.SubExif.FNumber,
    ExposureTime: data.SubExif.ExposureTime,
    ExposureBiasValue: data.SubExif.ExposureBiasValue
  }

  if (fs.existsSync(outputFile)) {
    console.log(`↩️  ${outputFile} exists, skipping`)
  } else {
    fs.writeFileSync(outputFile, JSON.stringify(relevantData))
    console.log(`✅ Saved ${outputFile}`)
  }
}

const readFiles = files =>
  Promise.all(
    files.map(async filename => {
      const buffer = await readFile(filename)
      return { filename, buffer }
    })
  )

const extractExif = async () => {
  console.log(`✨  Reading image files in ${options.inputDir}`)
  try {
    const fileGlob = `${options.inputDir}/*.+(${options.imageFormats.join(
      '|'
    )})`
    const files = await glob(fileGlob)
    const imageFiles = await readFiles(files)
    Promise.all(imageFiles.map(saveExif))
      .then(() => process.exit())
      .catch(console.error)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

extractExif()

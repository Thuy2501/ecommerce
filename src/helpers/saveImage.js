
const { ROOT_FILE_UPLOAD_DIR } = process.env
const path = require('path')
const Resize = require('./Resize')
const fs = require('fs')
const saveImage = async (req) => {
  const { width, height } = req.body
  const imagePath = ROOT_FILE_UPLOAD_DIR
    ? ROOT_FILE_UPLOAD_DIR
    : path.join(__dirname, './uploads/')

  const files = req.files
  let dataImage = {}
  for (const f in files) {
    const mapPromise = files[f].map(async (f1) => {
      const imageBuffer = fs.readFileSync(f1.path)
      const pixels = { width, height }
      const fileUpload = new Resize(imagePath + '/' + f)
      const filename = await fileUpload.save(imageBuffer, f1.filename, pixels)
      const pathImage = 'uploads/' + f + '/' + filename
      return pathImage
    })
    const data = await Promise.all(mapPromise)
    dataImage[f] = data.length === 1 ? data[0] : data
  }
  return dataImage
}

module.exports = { saveImage }
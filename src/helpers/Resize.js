const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

class Resize {
  constructor(folder) {
    this.folder = folder
  }
  async save(buffer, fileName = 'default', pixels = null) {
    if (!fs.existsSync(this.folder)) {
      fs.mkdirSync(this.folder, { recursive: true })
    }

    let timeStamp = new Date().getTime()
    let fileExt = fileName.split('.')[fileName.split('.').length - 1]
    let fileNameWithoutExt = fileName.replace(`.${fileExt}`, '')
    let newFileName = fileNameWithoutExt + '-' + timeStamp + '.' + fileExt
    const filepath = this.filepath(newFileName)
    if (pixels && pixels.width && pixels.height) {
      if (!isNaN(pixels.width) && !isNaN(pixels.width)) {
        if (pixels.width > 0 && pixels.height > 0) {
          await sharp(buffer)
            .resize(Number(pixels.width), Number(pixels.height), {
              fit: sharp.fit.inside,
              withoutEnlargement: true
            })
            .toFile(filepath)
        } else {
          await sharp(buffer).toFile(filepath)
        }
      } else {
        await sharp(buffer).toFile(filepath)
      }
    } else {
      await sharp(buffer).toFile(filepath)
    }
    return newFileName
  }

  filepath(fileName) {
    return path.resolve(`${this.folder}/${fileName}`)
  }
}
module.exports = Resize

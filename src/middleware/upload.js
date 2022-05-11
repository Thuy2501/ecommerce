const multer = require('multer')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, file.originalname)
    } else {
      // cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false)
    }
  }
})

const upload = multer({ storage: storage })

module.exports = upload
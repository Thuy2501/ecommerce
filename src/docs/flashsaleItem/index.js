const createFlashsaleItem = require('./create_flashsaleItem')

module.exports = {
  '/flashsale_item': {
    ...createFlashsaleItem
  }
}
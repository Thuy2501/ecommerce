const updateFlashsaleItem = require('./update_flashsaleItem')
const createFlashsaleItem = require('./create_flashsaleItem')

module.exports = {
  '/flashsale_item': {
    ...createFlashsaleItem
  },
  '/flashsale_item/:id': {
    ...updateFlashsaleItem
  }
}
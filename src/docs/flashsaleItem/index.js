const updateFlashsaleItem = require('./update-flashsaleItem')
const createFlashsaleItem = require('./create-flashsaleItem')
const deleteFlashsaleItem = require('./delete-flashsaleItem')

module.exports = {
  '/flashsale_item': {
    ...createFlashsaleItem
  },
  '/flashsale_item/{id}': {
    ...updateFlashsaleItem,
    ...deleteFlashsaleItem
  }
}
const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const flashsaleItemModel = sequelizeConnect.define(
  'flashsaleItems',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    discount: {
      type: DataTypes.FLOAT
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    id_product: {
      type: DataTypes.INTEGER
    },
    id_flashsale: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'flashsaleItems',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = { flashsaleItemModel }
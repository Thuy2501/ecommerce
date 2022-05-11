const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const orderDetailsModels = sequelizeConnect.define(
  'order_details',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.FLOAT
    },
    qty: {
      type: DataTypes.INTEGER
    },
    id_product: {
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'order_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'update_at'
  }
)

module.exports = {
  orderDetailsModels
}

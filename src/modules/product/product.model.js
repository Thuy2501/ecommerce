const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const productModel = sequelizeConnect.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    import_price: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    barcode: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING
    },
    image_detail: {
      type: DataTypes.STRING
    },
    id_category: {
      type:DataTypes.INTEGER
    }
  },
  {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = {
  productModel
}
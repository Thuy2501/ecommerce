const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const orderModel = sequelizeConnect.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    total_money: {
      type: DataTypes.FLOAT
    },
    phone: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    voucher_id: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      value: 'true' || 'pending'||'false'
    }
  },
  {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = { orderModel }

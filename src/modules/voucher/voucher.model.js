const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const voucherModel = sequelizeConnect.define(
  'vouchers',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    code: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.INTEGER
    },
    unit: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'true'
    },
    start_time: {
      type: DataTypes.DATE
    },
    end_time: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'vouchers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = {
  voucherModel
}

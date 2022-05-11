const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const flashsaleModel = sequelizeConnect.define(
  'flashsales',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    start_time: {
      type: DataTypes.DATE
    },
    end_time: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'flashsales',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = {
  flashsaleModel
}

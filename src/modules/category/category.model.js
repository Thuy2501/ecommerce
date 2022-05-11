const { DataTypes } = require('sequelize')
const { sequelizeConnect } = require('../../config/index')

const categoryModel = sequelizeConnect.define(
  'categorys',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    banner: {
      type: DataTypes.STRING
    },
    index: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'categorys',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = { categoryModel }

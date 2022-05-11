const { DataTypes } = require('sequelize')
const  {sequelizeConnect}  = require('../../config/index')

const userModel = sequelizeConnect.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      value: 'user' || 'admin'
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = {
  userModel
}
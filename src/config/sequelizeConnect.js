const { Sequelize } = require('sequelize')
require('dotenv').config()
const { SQL_DATABASE, SQL_USER, SQL_PASS, SQL_HOST, SQL_PORT } = process.env

/**init connect */
const sequelizeConnect = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASS, {
  host: SQL_HOST,
  port: SQL_PORT,
  dialect: 'postgres',
  logging: false
})
/** authen connect*/
if(process.env.NODE_ENV!=='test'){
sequelizeConnect
  .authenticate()
  .then(() =>
    console.log('*Database connection has been established successfully.')
  )
  .catch((error) => console.error('*Unable to connect to the database:', error))
}


module.exports = sequelizeConnect
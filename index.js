require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./src/routes/index')
const swaggerUI = require('swagger-ui-express')
const morgan = require('morgan')
const cors = require('cors')
const docs = require('./src/docs')
// var bodyParser = require('body-parser')


const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer().array())
// parse application/json
// app.use(bodyParser.json())

//registering cors
app.use(cors());
//configure body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
//configure body-parser ends here
if (process.env.MODE === "development") {
  app.use(morgan("dev")); // configire morgan
  app.use(express.static(__dirname));
}

app.use('/', routes)


const PORT = process.env.PORT || 4000


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

const server = app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

module.exports = { app, server }
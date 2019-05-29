'use strict'
//importar modulos
const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')
const morgan = require('morgan')

//instancia express
const app = express()
const api = require('./routes')


//middlewares
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

//Routes
app.use('/api', api)


module.exports = app
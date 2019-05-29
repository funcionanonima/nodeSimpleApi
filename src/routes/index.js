'use strict'

const express = require('express')
const productController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const auth = require('../middlewares/auth')
const api = express.Router()

//routes REST
api.get('/product', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId', productController.deleteProduct)

api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)
api.get('/user', UserController.getUser)

api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tiene acceso'})
})
module.exports = api
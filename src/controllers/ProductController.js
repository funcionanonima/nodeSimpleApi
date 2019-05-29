'use strict'
const Product = require('../models/Product')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

function getProduct(req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) return res.status(500).send({message: `Error ${error}`})
        if(!product) return res.status(404).send({message: `no existe`})

        res.status(200).send({product})
    })
}

function getProducts(req, res){
    Product.find({}, (err, products) => {
        if(err) return res.status(500).send({message: `Error ${error}`})
        if(!products) return res.status(404).send({message: 'No existen productos'})

        res.status(200).send({products})
    })  
}

function saveProduct(req, res){
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.image = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.body = req.body.body

    product.save((err, productStored) => {
        if(err)res.status(500).send({message: `Error: ${err}`})
        res.status(200).send({message: productStored})
    })
}

function updateProduct(req, res){
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if(err) res.status(500).send({message: `Error al borrar ${err}`})

        res.status(201).send({product: productUpdated})
    })
}

function deleteProduct(req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, prod) => {
        if(err) res.status(500).send({message: `Error al borrar ${err}`})
        prod.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar ${err}`})
            res.status(200).send({message: "Producto eliminado"})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
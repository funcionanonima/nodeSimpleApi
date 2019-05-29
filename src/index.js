'use strict'

//REQUERIR MODULOS || connect('mongodb://localhost:27017/collection')
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
    if(err) throw err
    console.log("Hay conexion".yellow)

    //server
    app.listen(config.port, () => {
    console.log("Runing on port: ".cyan + config.port)
    })
}).catch((err) => {
    console.log(`Error al conectar ${err}`)
})

/*
1** INFORMATIVAS | recibida y procesando
2** CORRECTAS | ok
3** REDIRECION | mas acciones apra finalizar la req 
4** ERROR DE CLIENTE | ~
5** ERROR DE SERVER | ~
*/
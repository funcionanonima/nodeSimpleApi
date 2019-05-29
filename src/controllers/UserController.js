'use strict'

const User = require('../models/User')
const service = require('../services')

function getUser(req, res){
    User.find({}, (err, users) => {
        if(err) return res.status(500).send({message: `Error ${error}`})
        if(!users) return res.status(404).send({message: 'No existen productos'})

        res.status(200).send({users})
    })  
}

const signUp = (req, res) => {
    let user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.avatar = user.gravatar()

    user.save(err => {
        if(err) return res.status(500).send({message: `No se puede crear la usuario: ${err}`})
        return res.status(200).send({token: service.createToken(user)})
    })
}

const signIn = (req, res) => { 
    User.findOne({ email: req.body.email }, (err, user) => { 
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
        if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

        return user.comparePassword(req.body.password, (err, isMatch) => { 
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` }) 

            req.user = user 
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) 
        }) 
    })
}).select('_id email + password');
}

module.exports = {
    signIn,
    signUp,
    getUser
}

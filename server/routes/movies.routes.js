let express = require('express')
let router = express.Router()
let pool = require('../../config/connections')
let models = require('../models/upload.models.js')
let fs = require("fs")
let multer = require('multer')
let upload  =  multer()
let bcrypt = require('bcrypt')

router.post('/login', upload.none(), (req, res)=>{
    models.login(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/profilePic', (req, res)=>{
    models.profilePic(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/signup', upload.none(), (req, res)=>{
    console.log("body", req.body)

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body['password'], salt, function(err, hash) {
            models.signUp({
                username: req.body['username'],
                email: req.body['email'],
                password: hash
            }, (err, results) => {
            if(err){
                res.send(err)
            } else {
                res.send(results)
            }
        })
        });
    });

    
})

module.exports = router
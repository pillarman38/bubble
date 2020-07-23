let express = require('express')
let router = express.Router()
let pool = require('../../config/connections')
let models = require('../models/upload.models.js')
let fs = require("fs")

router.post('/login', (req, res)=>{
    console.log("body", req.body)
    models.login(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

module.exports = router
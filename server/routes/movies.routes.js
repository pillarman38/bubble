let express = require('express')
let router = express.Router()
let pool = require('../../config/connections')
let models = require('../models/upload.models.js')
let fs = require("fs")
let multer = require('multer')
let bcrypt = require('bcrypt')

let photoPath = "D:/bubbleTempStorage"

var storage = multer.diskStorage({
    destination: function(req, file, next) {
        next(null, photoPath);
    },
    filename: function(req, file, next) {
        next(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.post('/login', upload.none(), (req, res)=>{
    console.log(req.body, req.query);
    models.login(req.body, (err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/signup', upload.none(), (req, res)=>{
    console.log(req.body);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body['password'], salt, function(err, hash) {
            models.signUp({
                username: req.body['username'],
                email: req.body['email'],
                password: hash,
                timeZone: req.body['timezone']
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

router.post('/questionGetter', upload.none(), (req, res) => {
    models.getQuestions((err, results)=>{
        if(err){
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

router.post('/verify', upload.none(), (req, res) => {
    models.verifyEmail(req.body['key'], (err, results) => {
        console.log("BODY", err, results);
        if(err){
            res.send({err: err})
        } 
        if({results: results}) {
            console.log("RESULTS", results);
            res.send(results)
        }
    })
})

router.post('/getchallengeorquestion', upload.none(), (req, res) => {
    models.getNewChallengeOrQuestion(req.body, (err, results) => {
        if(err){
            res.send({err: err})
        } 
        if({results: results}) {
            res.send(results)
        }
    })
})
router.get('/getarticles', upload.none(), (req, res) => {
    models.getArticles((err, results) => {
        if(err){
            res.send({err: err})
        } 
        if({results: results}) {
            res.send(results)
        }
    })
})
router.get('/selectDirectory', (req, res)=>{
    models.getDirectory((err, results)=>{
        if(err){
            return res.send({err: err})
        } else {
            res.send(results)
        }
    })
})
router.post('/answerquestion', upload.none(), (req, res) => {
    models.answerQuestion(req.body, (err, results) => {
        if(err){
            res.send({err: err})
        } 
        if({results: results}) {
            res.send(results)
        }
    })
})

module.exports = router
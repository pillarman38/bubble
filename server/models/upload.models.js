let pool = require('../../config/connections')
let fs = require('fs')
var fetch = require('node-fetch')
var multer = require('multer')
var bcrypt = require('bcrypt')

let routeFunctions = {
    signUp: (userInfo, callback) => {
        pool.query(`SELECT * FROM users WHERE email = '${userInfo['email']}'`, (err, res)=>{
            console.log(res, err)
            if(res[0] == null) {
                pool.query('INSERT INTO `users` SET ?', userInfo, (err, resultstwo) =>{
                    // console.log(err, resultstwo)
                    return callback("user added")
            })
            } if(res[0] != null) {
                if(res[0]['email'] == userInfo['email']) {
                    return callback("email in use")
                }
            }
        })
    },
    login: (loginInfo, callback) => {
        console.log(loginInfo)

        pool.query(`SELECT * FROM users WHERE email = '${loginInfo['email']}'`, (err, resp)=>{
            console.log(resp)
            bcrypt.compare(loginInfo['password'], resp['password'], function(err, resp) {
                    return callback(err, resp)
            }) 
        })
    },
    uploadPhotos: (photos, callback) => {
        pool.query("INSERT INTO userphotos SET ?", photos, (err, res)=>{
            callback(err, res)
        })
    },
    loadPhotos: (photos, callback) => {
        
        pool.query(`SELECT * FROM userphotos WHERE email = '${photos['email']}'`, (err, res)=>{
            callback(err, res)
        })
    }
}

module.exports = routeFunctions
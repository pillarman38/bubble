let pool = require('../../config/connections')
let fs = require('fs')
var fetch = require('node-fetch')
var multer = require('multer')
var bcrypt = require('bcrypt')
var mailer = require('nodemailer')
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
var jwt = require('jsonwebtoken');
const { sheets } = require('googleapis/build/src/apis/sheets')
const { get } = require('http')

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

let routeFunctions = {
    signUp: (userInfo, callback) => {
        console.log(userInfo)
        if(userInfo['deviceId']) {
            console.log(userInfo);
        } else {
        pool.query(`SELECT * FROM users WHERE email = '${userInfo['email']}'`, (err, res)=>{
            console.log(res, err)
            if(res[0] == null) {
                pool.query('INSERT INTO `users` SET ?', userInfo, (err, resultstwo) =>{
                    
                    var resp = JSON.stringify(resultstwo)

                    const oauth2Client = new OAuth2(
                        process.env.MAILING_SERVICE_CLIENT_ID, // ClientID
                        process.env.MAILING_SERVICE_CLIENT_SECRET, // Client Secret
                        "http://192.168.1.86:3001/homepage" // Redirect URL
                    );

                    oauth2Client.setCredentials({
                        refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN
                    });
                    const accessToken = oauth2Client.getAccessToken()

                    const smtpTransport = mailer.createTransport({
                        service: "gmail",
                        auth: {
                            type: "OAuth2",
                            user: "connorwoodford38@gmail.com", 
                            clientId: process.env.MAILING_SERVICE_CLIENT_ID,
                            clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
                            refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
                            accessToken: accessToken
                        }
                    });
                    
                    const mailOptions = {
                        from: "connorwoodford38@gmail.com",
                        to: "connorwoodford@yahoo.com",
                        subject: "Node.js Email with Secure OAuth",
                        generateTextFromHTML: true,
                        html: "<b>test</b>"
                    };
                    
                    smtpTransport.sendMail(mailOptions, (error, response) => {
                        error ? console.log(error) : console.log(response);
                        smtpTransport.close();
                    });
                    return callback({res: true})
            })
            } if(res[0] != null) {
                if(res[0]['email'] == userInfo['email']) {
                    return callback({res: false})
                }
            }
        })
    }
},
    
    login: (loginInfo, callback) => {
        pool.query(`SELECT * FROM users WHERE email = '${loginInfo['email']}' OR username = '${loginInfo['email']}'`, (err, resp)=>{
            console.log(loginInfo, resp, err)
            if(resp[0] === undefined) {
                return callback(err, {res: resp, user: false})
            } else {
                bcrypt.compare(loginInfo['password'], resp[0]['password'], function(err, res) {
                    console.log(err, res)
                    return callback(err, {res: res, user: resp[0]['username']})
                })  
            }
        })
    },
    
    getQuestions: (date, callback) => {
        pool.query(`SELECT * FROM questions`, (err, res)=>{
            callback(err, res)
        })
    },

    verifyEmail: (token, callback) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            console.log("WHAA", err, decoded);
            callback(err, decoded)
        });
    },
    getNewChallengeOrQuestion: (challengeObj, callback) => {
        console.log(challengeObj);
        pool.query(`SELECT * FROM currentquestions WHERE user = '${challengeObj['user']}'`, (err, res) => {
            console.log("here is res", res);
            if(res.length == 0) {
                pool.query(`SELECT * FROM questions`, (err, resp) => {
                    // console.log(resp);
                    var justQs = resp.map((itm) => itm['question'])
                    // console.log(justQs);
                    var getQ = justQs[Math.floor(Math.random() * justQs.length)];
                    console.log("Here is the new q", getQ);
                    pool.query(`INSERT INTO currentquestions SET ?`, {user: challengeObj['user'], question: getQ}, (err, res) => {
                        var ret = {
                            status: "not answered yet",
                            question: res[0]['question']
                        }
                        callback(err, res)
                    })
                })
            } else {
               pool.query(`SELECT * FROM questionsasked WHERE user = '${challengeObj['user']}' AND question = '${res[0]['question']}'`, (error, resp) => {
                console.log("hi", error, resp, resp.length, res);
                var ret = {}
                if(resp.length != 0) {
                    ret = {
                        status: "question answered",
                        question: resp[0]['question'],
                        answer: resp[0]['answer']
                    }
                } 
                if(resp.length == 0) {
                    console.log(res);
                    res[0]['status'] = "not answered yet"
                    ret = {res: res[0]}
                }
                callback(error, ret)
            }) 
            }
        })
    },
    getArticles: (user, callback) => {
        console.log(user);
        pool.query(`SELECT * FROM articles`, (err, res) => {
            pool.query(`SELECT * FROM likedarticles WHERE user = '${user['res']}'`, (error, resp) => {
                var arr = []
                finalArr = []
                var arrObj = {}
                
                if(res.length != resp.length) {
                    for(var i = 0; i < res.length; i++) {
                        if(resp[i] != undefined) {
                            arr.push(resp[i]['title'])
                            finalArr.push(resp[i])
                            console.log(i, res.length);
                        } else {
                            var filtered = res.filter((itm) => {
                                if(!arr.includes(itm['title'])) {
                                    itm['liked'] = false
                                    return itm
                                }
                        })
                        if(i == res.length - 1) {
                            arr.push(filtered)
                            for(var x = 0; x < filtered.length; x++) {
                                finalArr.push(filtered[x])
                            }
                            console.log(res.length, finalArr.length);
                            console.log(finalArr);
                            callback(err, finalArr)
                        }
                    }
                } 
                } else {
                    console.log("else", resp);
                    callback(error, resp)
                }  
            })
        })
    },
    answerQuestion: (userInfo, callback) => {
        pool.query(`INSERT INTO questionsasked SET ?`, userInfo, (err, res) => {
            console.log(err, res);
        })
    },
    likedArticles: (article, callback) => {
        // console.log("article", article);
        pool.query(`SELECT * FROM likedarticles WHERE user = '${article['user']}' AND title = '${article['title']}'`, (error, resp) => {
            if(resp.length == 0) {
                console.log(article);
                article['liked'] = true
                pool.query(`INSERT INTO likedArticles SET ?`, article, (err, res) => {
                    console.log(res);
                })
            }
            if(resp.length != 0) {
                var liked = 0
                if(resp[0]['liked'] == 0) {
                    liked = 1
                }
                if(resp[0]['liked'] == 1) {
                    liked = 0
                }
                pool.query(`UPDATE likedarticles SET liked = '${liked}' WHERE user = '${article['user']}' AND title = '${article['title']}'`, (err, response) => {
                    console.log("hi", err, response);
                })
           }
        })
    },
    getBubbles: (user, callback) => {
        console.log(user);
        pool.query(`SELECT * FROM personalbubble WHERE user = '${user['user']}'`,(err, res) => {
            console.log(err, res);
            callback(err, res)
        })
    },
    getQuotes: (callback) => {
        pool.query(`SELECT * FROM quotes`, (err, res) => {
            console.log(err, res);
            callback(err, res)
        })
    }
    // addBubble: (bubble, callback) => {
    //     pool.query(`INSERT INTO personalbubble SET ?`, bubble, (err, res) => {
    //         console.log(err, res);
    //         pool.query(`SELECT * FROM personalbubble WHERE user = '${bubble['user']}'`,(err, res) => {
    //             console.log(err, res);
    //             callback(err, res)
    //         })
    //     })
    // },
    // kickout: (kicked, callback) => {
    //     pool.query(`DELETE FROM personalbubble WHERE user = '${kicked['user']}' AND entry = '${kicked['item']['entry']}'`, (err, res) => {
    //         pool.query(`SELECT * FROM personalbubble WHERE user = '${kicked['user']}'`,(error, resp) => {
    //             console.log(error, resp);
    //             callback(error, resp)
    //         })
    //     })
    // }
}

module.exports = routeFunctions
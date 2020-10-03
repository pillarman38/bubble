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
                    console.log(err, resultstwo)

                    var resp = JSON.stringify(resultstwo)
                    var token = jwt.sign({
                        username: userInfo['email'],
                        password: userInfo['password']
                    }, process.env.ACCESS_TOKEN_SECRET);
                    
                    console.log("TOKEN", token);

                    const oauth2Client = new OAuth2(
                        process.env.MAILING_SERVICE_CLIENT_ID,
                        process.env.MAILING_SERVICE_CLIENT_SECRET,
                        process.env.OAUTH_PLAYGROUND
                      );
                      const TEMPLATES = {
                        subscribe: {
                          fileName: 'subscribe.ejs',
                          subject: '[ABC Inc.] Welcome to ABC Inc.',
                        },
                      };
                    //   console.log(process.env);
                        oauth2Client.setCredentials({
                          refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
                        });
                        const accessToken = oauth2Client.getAccessToken();
                        const transporter = mailer.createTransport({
                          service: 'gmail',
                          auth: {
                            type: 'OAuth2',
                            user: process.env.SENDER_EMAIL_ADDRESS,
                            clientId: process.env.MAILING_SERVICE_CLIENT_ID,
                            clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
                            refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
                            accessToken,
                          },
                        });

                        let mailOptions = {
                            from: '"Connor Woodford" <connorwoodford38@gmail.com>', // sender address
                            to: `${userInfo['email']}`, // list of receivers
                            subject: 'Test Mail from ME using NodeJS', // Subject line
                            text: 'Hello world ?', // plain text body
                            html: `<b>Confirm email here: </b><a href="http://localhost:3001/emailverify/${token}">Here</a>` // html body
                        };

                        transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
                            let accessToken = userTokens[user];
                            console.log("TOKEN", accessToken, user, userTokens)
                            if(!accessToken){
                                return callback(new Error('Unknown user'));
                            }else{
                                return callback(null, accessToken);
                            }
                        });

                        transporter.on('token', token => {
                            console.log('A new access token was generated');
                            console.log('User: %s', token.user);
                            console.log('Access Token: %s', token.accessToken);
                            console.log('Expires: %s', new Date(token.expires));
                        });
                        
                        transporter.sendMail(mailOptions, (error, info) => {
                            console.log("hi")
                            if (error) {
                                console.log(error)
                                return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
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
                var userLikedArticleTitles = resp.map((itm) => itm['title'])
                var allTitles = res.map((itm) => itm['title'])
                var arr = []
                var arrObj = {}
                for(var i = 0; i < allTitles.length; i++) {
                    if(userLikedArticleTitles.includes(allTitles[i])){
                        arrObj = {
                            user: user,
                            title: allTitles[i],
                            article: res[i]['article'],
                            liked: true
                        }
                        arr.push(arrObj)
                    } else {
                        arrObj = {
                            user: user,
                            title: allTitles[i],
                            article: res[i]['article'],
                            liked: false
                        }
                        arr.push(arrObj)
                    }
                    console.log(i, arr.length - 1);
                    if(arr.length == res.length) {
                        callback(err, arr)
                    }
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
                    console.log(err, response);
                    
                })
            }
        })
    },
    getBubble: (user, callback) => {
        console.log(user);
        pool.query(`SELECT * FROM personalbubble WHERE user = '${user['user']}'`,(err, res) => {
            console.log(err, res);
            callback(err, res)
        })
    },
    addBubble: (bubble, callback) => {
        pool.query(`INSERT INTO personalbubble SET ?`, bubble, (err, res) => {
            console.log(err, res);
            pool.query(`SELECT * FROM personalbubble WHERE user = '${bubble['user']}'`,(err, res) => {
                console.log(err, res);
                callback(err, res)
            })
        })
    }
}

module.exports = routeFunctions
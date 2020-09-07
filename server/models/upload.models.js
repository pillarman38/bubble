let pool = require('../../config/connections')
let fs = require('fs')
var fetch = require('node-fetch')
var multer = require('multer')
var bcrypt = require('bcrypt')
var mailer = require('nodemailer')
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
var jwt = require('jsonwebtoken');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

let routeFunctions = {
    signUp: (userInfo, callback) => {
        console.log(userInfo)
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
    },
    
    login: (loginInfo, callback) => {
        pool.query(`SELECT * FROM users WHERE email = '${loginInfo['email']}' OR username = '${loginInfo['email']}'`, (err, resp)=>{
            // var resObj = JSON.stringify(resp[0])
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
    }
}

module.exports = routeFunctions
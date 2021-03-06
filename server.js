require('./config/config')
require('./config/mailer')
require('./server/models/cron')
const express = require('express')
const app = express()
const appTwo = express()
const port = 3001
var cors = require('cors')
var http = require('http')
var bparser = require('body-parser')

app.use(bparser.urlencoded());
app.use(bparser.json())
app.use(express.static(__dirname + '/dist'))
app.use(express.static("D:/"))

app.use(cors())

let userRoutes = require('./server/routes/movies.routes')

// app.use("/", mailerRoutes)
app.use('/api/management', userRoutes)

app.get('*', (req, res) => {
    res.sendFile('/dist/index.html', {root: __dirname})
})

var server = app.listen(port, function() {
    var host = 'localhost';
    var thisport = server.address().port;
    console.log(`Example app on port ${port}!`);
});

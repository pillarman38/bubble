var CronJob = require('cron').CronJob;
let pool = require('../../config/connections')

var job = new CronJob('15 * * * * *', function() {
pool.query('SELECT * FROM users', (err, res) => {
    pool.query('SELECT * FROM questions', (err, resp) => {
        pool.query('SELECT * FROM questionsasked', (err, response) => {
            for(var i = 0; i < res.length; i++) {
                const questions = resp.map(officer => officer.question);
                const questionsasked = response.map(response => response.question)
                
                var filteredArr = questions.filter(el => questionsasked.indexOf(el) == -1)
                console.log(filteredArr);
                var qPicker = Math.floor(Math.random() * filteredArr.length)

                pool.query(`UPDATE currentquestions SET question = '${filteredArr[qPicker]}' WHERE user = '${res[i]['username']}'`, (err, updateres) => {
                    console.log(err, updateres);
                })
            }
        })
    })
})

})
job.start()

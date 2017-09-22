const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require("https");
const cors = require('cors');
const path = require('path');
var request = require('request');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const app = express();



app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const ebritek = process.env.EB;
const watsonu = process.env.WATU;
const watsonp = process.env.WATP;
console.log('dotenv: ' + watsonp);

app.use(express.static(`${__dirname}/client/build`));

var text;

var options = {
    url: `https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&tones=emotion&text=${text}`,
    auth: {
        'user': watsonu,
        'pass': watsonp
    }
};

app.get('/api/test', function(req,res) {

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json({score: JSON.parse(body)});
            console.log(JSON.parse(body))
        }
    }
    request(options, callback);
})

app.post('/api/test', function(req,res) {
    console.log(`this is the post inside server${req.body.text}`)
    text = req.body.text
    console.log(`this is the text inside post ${text}`)



//     app.get('/api/test', function(req,res) {
//     function callback(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             res.json({score: JSON.parse(body)});
//             console.log(JSON.parse(body))
//         }
//     }
//     request(options, callback);
// })
})
app.get('*', function(req, res) {
    res.status(404).send({message: 'Oops! Not found'});
});


// var request = require('request');
// app.get('/', function(req, res) {
//     request('https://www.eventbriteapi.com/v3/events/?token=${EB}', function(error, response, body) {
//         res.json(body)
//     });
// });

// Setting up port & listen

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


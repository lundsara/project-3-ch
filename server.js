const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require("https");
const cors = require('cors');
const path = require('path');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const app = express();


app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const watsonu = process.env.WATU;
const watsonp = process.env.WATP;
console.log('dotenv: ' + watsonp);

// request.get('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19', {
//     'auth': {
//       'user': watsonu,
//       'pass': watsonp,
//       'sendImmediately': false
//     },
    
//   })
var request = require('request');

let text= 'I am so happy that things work so well why is this happen in this way, Iam so hungry'
var options = {
    url: `https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=${text}`,
    auth: {
        'user': watsonu,
        'pass': watsonp
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        
    }
}

request(options, callback);


app.get('/api/hello', function(req,res) {
    res.json({message:'Hello World'});
})
app.get('/api/test', function(req,res) {
    res.json({score: body});
})

app.get('*', function(req, res) {
    res.status(404).send({message: 'Oops! Not found'});
});

// Setting up port & listen

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


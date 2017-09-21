const dotenv = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const app = express();


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const watsonu = process.env.WATU;
const watsonp = process.env.WATP;
console.log('dotenv: ' + watsonp);

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19",
    "method": "POST",
    "headers": {
      "authorization": "Basic ZmIzODBkMjgtYjQ0My00MGJiLTg1ZTYtY2FlYjgyNWM0ZmI5OjQ3dE5oR2xoalowVg==",
      "cache-control": "no-cache",
      "postman-token": "9d7c285d-0ad2-06bd-d307-e7118d02a20c"
    },
    "data": "{\n  \"text\": \"I am happy, very happy to see you again. So happy that I'm bleeding with happiness\"\n}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });




app.get('/api/hello', function(req,res) {
    res.json({message:'Hello World'});
})

app.get('*', function(req, res) {
    res.status(404).send({message: 'Oops! Not found'});
});

// Setting up port & listen

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});


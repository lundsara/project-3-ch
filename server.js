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


const express = require('express')
const axios = require('axios').default;
const app = express();
const path = require('path');


const flyWeather = require('./apiRouter/flyWeather');


app.use('/api',flyWeather);


app.listen(8087);

console.log('Panda Fly web server at running..')
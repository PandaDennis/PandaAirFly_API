const express = require('express')
const axios = require('axios').default;
const router = express();
const path = require('path');


router.get('/flyWeather/sunriseAndSunset/:trtoday', async function (req, res) {

    var resJson;
    var sunData = [];
    var reqURL = 'https://data.weather.gov.hk/weatherAPI/opendata/opendata.php?dataType=SRS&rformat=json&year='+new Date().getFullYear();
    // console.log(reqURL);
    // console.log(req.params['today']);
    // data by HKO
    await axios.get(reqURL)
        .then(function (response) {
            resJson = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    if(req.params['trtoday'] != null && req.params['trtoday'] == 'true'){
        for (var key in resJson.data) {
            
            if( new Date(resJson.data[key][0]).toISOString().slice(0, 10)  ==  new Date().toISOString().slice(0, 10) ){
                sunData.push({
                    //"日期":tDate.toLocaleDateString("en-US",options),
                    "date": resJson.data[key][0],
                    "sunrise": resJson.data[key][1],
                    "sunset": resJson.data[key][3]
                });
                break; 
            }
        }

    }
    if(req.params['trtoday'] != null && req.params['trtoday'] == 'false'){
        for (var key in resJson.data) {
            sunData.push({
                //"日期":tDate.toLocaleDateString("en-US",options),
                "date": resJson.data[key][0],
                "sunrise": resJson.data[key][1],
                "sunset": resJson.data[key][3]
            });  
        }
    }else{
        sunData.push({
            Error: true
        })
    }
    
    
    res.send(sunData);
})









module.exports = router;

//var htp = require('http');
var f = require('fs');
var express = require('express');
var app = express();

app.set('views','./views')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}));

app.get('/', function(req,res){
    res.render('index');
});
app.post('/weather', function(req,res){
    var a = "http://api.openweathermap.org/data/2.5/weather?q=";
    var b = "&appid=be38ae2e8f86831cbaf3426f353b8faf&units=metric";
    city = req.body.city.trim()
    city = city.replace(/\s/g, '+')
    var url = a + city + b;
    
    var reqs = require('request');
    reqs(url , function(error,resp,body){
        if(resp.statusCode === 200){
            var data = JSON.parse(body); 
            res.render('weather' ,{
                city:data['name'],
                temp:data.main.temp,
                hmd: data.main.humidity,
                press:data.main.pressure,
                wind : data.wind.speed
            })
        }
    });   
});
app.listen(process.env.PORT || 7777);


var f = require('fs');
var express = require('express');
var app = express();
app.get('/', function(req,res){
    res.send('<html><head><h1>please enter city name after / in url.<br></h1><h1>in case of name with multiple word, concatenate it i.e for new delhi,write New+Delhi.<br></h1></head></html>')
});
app.get('/:city', function(req,res){
    var a = "http://api.openweathermap.org/data/2.5/weather?q=";
    var b = "&appid=be38ae2e8f86831cbaf3426f353b8faf&units=metric";
    var url = a + req.params.city + b;
    var reqs = require('request');
    reqs(url , function(error,resp,body){
        if(resp.statusCode === 200){
            var data = JSON.parse(body); 
            res.writeHead(200 , {'Content-Type' : 'text/html'});
            var str = f.readFileSync(__dirname + '/we.htm' , 'utf8');
            str = str.replace('{cname}',data['name']);
            str = str.replace('{ctemp}',data.main.temp);
            str = str.replace('{chmd}',data.main['humidity']);
            str = str.replace('{cpress}',data.main['pressure']);
            str = str.replace('{cwnd}',data.wind['speed']);
            str = str.replace('{cwnddir}',data.wind['deg']);
            res.end(str);
        }
    });   
});
app.listen(7777);

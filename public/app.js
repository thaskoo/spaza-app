var express = require('express');
var exphbs  = require('express-handlebars');
var productList = require("../productList");
var app = express();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/productList', function (req, res){
	res.render('productList');
});
 
app.listen(3000);
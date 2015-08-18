var express = require('express');
var exphbs  = require('express-handlebars');
var product = require('./productList'); // require our productlist
var soldItem = require('./productsSold');
var mostPopular = require('./mostPopularItem');


var app = express();
var fs = require('fs');

 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //is a popular JavaScript template engine used in Meteor, 
//It allows us to inject results from a function or object property directly into our html.
app.get('/product', function(req, res) { // app.get our product
	var productMap = product.linesInFiles('./files/Nelisa Sales History.csv');
	res.render('productList', {product: productMap}); // restart must render our productLists
});

app.get('/product/soldItem', function(req, res){
	//var productMap = soldItems.linesInFiles('./files/Nelisa Sales History.csv');
	var productMap = soldItem.soldItems('./files/Nelisa Sales History.csv');
	res.render('productsSold', {product: productMap});
});

app.get('/product/mostPopular', function(req, res){
	var mostPopularProducts = mostPopular.productSold('./files/Nelisa Sales History.csv');
	res.render('mostPopularItem', {product: mostPopularProducts});
});
 
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);
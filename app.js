var express = require('express');
var exphbs  = require('express-handlebars');
var product = require('./productList'); // require our productlist
var soldItem = require('./productsSold');
var mostPopularItems = require("./mostPopularItem");
var category = require("./category");
var mostCategoryProduct = require("./mostCategoryProduct");
var leastPopularProduct = require("./leastPopularProduct");
var leastPopularCategory = require("./leastPopularCategory");

var app = express();
var fs = require('fs');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); 

app.get('/product', function(req, res) { // app.get our product
	var productMap = product.linesInFiles('./files/Nelisa Sales History.csv');
	res.render('productList', {product: productMap}); // restart must render our productLists
});

app.get('/product/soldItem', function(req, res){
	//var productMap = soldItems.linesInFiles('./files/Nelisa Sales History.csv');
	var productMap = soldItem.soldItems('./files/Nelisa Sales History.csv');
	res.render('productsSold', {product: productMap});
});

app.get('/product/mostPopularItems', function(req, res){
	var mostPopularProducts = mostPopularItems.productSold('./files/Nelisa Sales History.csv');
	res.render('mostPopularItem', {product: mostPopularProducts});
});

app.get('/product/productsSold', function(req, res){
	var categoryMap = category.getCategory('./files/Nelisa Sales History.csv');
	res.render('category', {product: categoryMap});
});
app.get('/cat/category', function(req, res){
	var categoryMap = category.Findcategory('./files/Nelisa Sales History.csv');
	res.render('mostCat', {cat:categoryMap})
});
app.get('/product/mostCategoryProduct', function(req, res){
	var categoryMap = mostCategoryProduct.totalCategory('./files/Nelisa Sales History.csv');
	res.render('mostCategoryProduct', {product:categoryMap})
});
app.get('/product/leastPopularProduct', function(req, res){
	var productsMap = leastPopularProduct.productSold('./files/Nelisa Sales History.csv');
	res.render('leastPopularProduct', {product:productsMap})
});
app.get('/product/leastPopularCategory', function(req, res){
	var categoryMap = leastPopularCategory.totalCategory('./files/Nelisa Sales History.csv');
	res.render('leastPopularCategory', {product:categoryMap})
});


 
app.get('/', function (req, res) {
    res.render('home');
});

//app.listen(3000);
 var server = app.listen(3000, function () {

     var host = server.address().address;
     var port = server.address().port;

     console.log('Example app listening at http://%s:%s', host, port);

   });
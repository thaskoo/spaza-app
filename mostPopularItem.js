var fs  = require("fs");

 var productsSold = require('./productsSold');

var	findmostPopularProduct = function(file){

	var productsMap = productsSold.soldItems(file);

	var mostPopularProducts = {}; // declaring the mostpopular to be in an curly brackets
	var maximum = 0; //declaring the maximum

	for (var property in productsMap){
		var value = productsMap[property];

		if(productsMap[property] > maximum){
			maximum = productsMap[property];
			mostPopularProducts = { //using leteral object
				name: property,
				amount: maximum
			};
		};
	};
	console.log(mostPopularProducts);

	return mostPopularProducts;
};
exports.productSold = function(file){
	var mostPopularProducts = findmostPopularProduct (file);
	return mostPopularProducts;
	
};

var fs = require("fs");
 var productsSold = require('./productsSold'); // require the productsSold file

var	findleastProduct = function(file){ // declare the function called FindLeastProduct

	var productsMap = productsSold.soldItems(file);

	var mostleastProducts = {}; // declaring the mostpopular to be in an curly brackets
	var min = 172; //declaring the min, because our maximum in product is 172

	for (var property in productsMap){ //created the for loop,to check or to compare whether we find our product
		var value = productsMap[property];

		if(productsMap[property] < min){
			min = productsMap[property];
			mostleastProducts  = { //using leteral object
				name: property, //give it a name
				amount: min //give it the amount 
			};
		};
	};
	console.log(mostleastProducts);

	return mostleastProducts; 
};
exports.productSold = function(file){
	var mostleastProducts  = findleastProduct (file);
	return mostleastProducts ;
	
};

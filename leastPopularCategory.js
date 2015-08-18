var fs = require("fs");
   var category = require("./category");

var	findleastCategory  = function(file){

	var CategoryMap = category.getCategory(file);

	var mostleastCategory = {}; // declaring the mostpopular to be in an curly brackets
	var min = 328; //declaring the min

	for (var property in CategoryMap){
		var value = CategoryMap[property];

		if(CategoryMap[property] < min){
			min = CategoryMap[property];
			mostleastCategory  = { //using leteral object
				name: property,
				amount: min
			};
		};
	};
	console.log(mostleastCategory);

	return mostleastCategory ;
};
exports.totalCategory = function(file){
	var mostleastCategory  = findleastCategory (file);
	return mostleastCategory ;
	
};

var fs = require("fs");
var category = require("./category");
var Findcategory = function (file){

	
	var categoryMap = category.getCategory(file);
			var max = 0; //declaring the maximum
	for(var prop in categoryMap){
			var value = categoryMap[prop];
	if(categoryMap[prop] > max){
			max =categoryMap[prop];
				mostCategoryProduct ={
				productName: prop,
				amount:max
		};
	};
};
console.log(mostCategoryProduct);
return mostCategoryProduct;
};

exports.totalCategory =function(file){
	var mostCategoryProduct = Findcategory(file);
	return mostCategoryProduct;
};
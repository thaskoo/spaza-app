var fs  = require("fs"); // define the module

var FindCategorylist = function (file) {
	var productsSold = require('./productsSold');

	var productCatMap = {
		'Milk 1l':'Dairy',
		'Imasi':'Dairy', 
		'Bread':'Grain',
		'Chakalaka Can': 'Canned', 
		'Gold Dish Vegetable Curry Can': 'Canned',
		'Fanta 500ml':'coldDrinks', 
		'Coke 500ml':'coldDrinks', 
		'Cream Soda 500ml':'coldDrinks', 
		'Iwisa Pap 5kg':'Grain', 
		'Top Class Soy Mince': 'Dried', 
		'Shampoo 1 litre':'Toiletries', 
		'Soap Bar':'Toiletries', 
		'Bananas - loose': 'Fruits',
		'Apples - loose':'Fruits', 
		'Mixed Sweets 5s':'confectionery', 
		'Heart Chocolates':'confectionery', 
		'Rose (plastic)': 'Gifts',
		'Valentine Cards':'Gifts'
		}
	var categoryMap = {} 
	var productMap = productsSold.soldItems(file);// declaring the categoryMap

	for(var ProductName in productMap) {
		var categoryName = productCatMap[ProductName];
		var quantity = productMap[ProductName];

		if(categoryMap[categoryName] === undefined){
			categoryMap[categoryName] = 0;

		};
		categoryMap[categoryName]= categoryMap[categoryName]+ quantity;
	};

	console.log(categoryMap);

	return categoryMap;

};
exports.getCategory = function(file){
	var categoryMap = FindCategorylist(file);
	  return categoryMap;
	
};


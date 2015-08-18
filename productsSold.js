var fs  = require("fs");

var FindtheProducts= function(file){
	var soldItems = [];
	var productMap = {};

	var fileContent = fs.readFileSync(file, "utf8");
	var products = fileContent.split("\r").splice(1);

	products.forEach(function(product) {
		//finding 
		var hold = product.split(";");
 		var productName = hold [2];
		var productQuantity = Number(hold[3]);

		if(productMap[productName]=== undefined){
			productMap[productName] = 0;
 	 		soldItems.push(productName);
 	 			}
 	 			//console.log(productMap[productName]);

 	 		productMap[productName] = productMap[productName] + productQuantity;
 	 	});
 		//console.log(soldItems);

       return productMap;
	} 
exports.soldItems= function(file){
	var productList = FindtheProducts(file);
	return productList;
	
}



	
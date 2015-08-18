  var fs  = require("fs"); // define the module

var findFiles = function (file) { // find files into our file
    var productList = []; 
    var productMap = {};

    var fileContent = fs.readFileSync(file, "utf8"); 
        var products = fileContent.split("\r").splice(1); // splice "modifies" the original array itself.
      //it split the product into contents using rows,its the same as "\n"-"\r"
    products.forEach(function(product) { 
      var hold = product.split(";"); //we split it with commas
      var productName = hold[2]; // we want it to hold the 2 column because its the stock item
      
      if(productMap[productName] === undefined && productName != undefined){  // we checking if productName is equal to the undefined && productName is not equal to the undefined
        productMap[productName] = 0; 
        productList.push(productName); // here productlist pushes the productName and return all the productList in an array
      };
      
      
    }); 
 console.log(productList)
  return productList; // return our productLists

}
exports.linesInFiles = function(file){
  var productList = findFiles(file);
  return productList;
};

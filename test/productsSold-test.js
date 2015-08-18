var assert = require("assert");

var productList = require("../productList");
var products= require("../productsSold");


    it('should return a unique list of product in the file synchronously', function(){

        
        var productLines = productList.linesInFiles("./files/Nelisa Sales History.csv");
        assert.deepEqual(productLines, ["Milk 1l","Imasi","Bread","Chakalaka Can","Gold Dish Vegetable Curry Can","Fanta 500ml","Coke 500ml","Cream Soda 500ml","Iwisa Pap 5kg","Top Class Soy Mince","Shampoo 1 litre","Soap Bar","Bananas - loose","Apples - loose","Mixed Sweets 5s","Heart Chocolates","Rose (plastic)","Valentine Cards"]);

    });
    it('should return a total number and each item sold', function(){

        //var products = new Products("./file/Nelisa Sales History.csv");
        var thefile = "./files/Nelisa Sales History.csv";

        var productsQuantityMap = products.soldItems(thefile);

        console.log(productsQuantityMap);
        
        assert.equal(142, productsQuantityMap["Milk 1l"]);
        assert.equal(125, productsQuantityMap["Imasi"]);
        assert.equal(130, productsQuantityMap["Bread"]);
        assert.equal(94, productsQuantityMap["Chakalaka Can"]);
        assert.equal(86, productsQuantityMap["Gold Dish Vegetable Curry Can"]);
        assert.equal(94, productsQuantityMap["Fanta 500ml"]);
        assert.equal(159, productsQuantityMap["Coke 500ml"]);
        assert.equal(75, productsQuantityMap["Cream Soda 500ml"]);
        assert.equal(47, productsQuantityMap["Iwisa Pap 5kg"]);
        assert.equal(98, productsQuantityMap["Top Class Soy Mince"]);
        assert.equal(26, productsQuantityMap["Shampoo 1 litre"]);
        assert.equal(50, productsQuantityMap["Soap Bar"]);
        assert.equal(114,productsQuantityMap["Bananas - loose"]);
        assert.equal(114, productsQuantityMap["Apples - loose"]);
        assert.equal(172, productsQuantityMap["Mixed Sweets 5s"]);
        assert.equal(20, productsQuantityMap["Heart Chocolates"]);
        assert.equal(14, productsQuantityMap["Rose (plastic)"]);
        assert.equal(14, productsQuantityMap["Valentine Cards"]);
   
	});
        it('should return the most popular product sold', function(){

        var mostPopularItems = require("../mostPopularItem");
        
        
        var ProductResults = mostPopularItems.productSold("./files/Nelisa Sales History.csv");
        var resultsMap = { name: "Mixed Sweets 5s", amount: 172 };
        //console.log(resultsMap);
        assert.deepEqual(resultsMap,ProductResults);
    });

        it('should categorize all of the products', function(){
                var category = require("../category");
           // var categories = require("../category");
    
            var map = category.getCategory("./files/Nelisa Sales History.csv");

        var expectedmap = { 
        Dairy:267, //ileteral object
        Grain:177,
        Canned:180,
        coldDrinks:328,
        Dried:98,
        Toiletries:76,
        Fruits:228,
        confectionery:192,
        Gifts:28 
    }

        //console.log(expectedmap);
        assert.deepEqual(expectedmap, map);
});
        it('should return the most popular category sold', function(){
            var mostCategoryProduct = require("../mostCategoryProduct");

        var results = mostCategoryProduct.totalCategory("./files/Nelisa Sales History.csv");
        var expectedMap = { productName: "coldDrinks", amount: 328 };

        assert.deepEqual(results,expectedMap);
});
        
   
 it('should return the least popular product sold', function(){

        var leastPopularProduct = require("../leastPopularProduct");
        var ProductResults = leastPopularProduct.productSold("./files/Nelisa Sales History.csv");
        var resultsMap = { name: 'Rose (plastic)', amount: 14 };
        //console.log(resultsMap);
        assert.deepEqual(resultsMap,ProductResults);
    });


  it('should return the least popular category sold', function(){
        var leastPopularCategory = require("../leastPopularCategory");

        var results = leastPopularCategory.totalCategory("./files/Nelisa Sales History.csv");
        var expectedMap = { name: 'Gifts', amount: 28};

        assert.deepEqual(results,expectedMap);
});

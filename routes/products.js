exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT product_id, product_name FROM products', [], function(err, results) {
        	     if (err) return next(err);
    		      res.render( 'productlist', {
		        no_products : results.length === 0,
		           products : results
    	});
    	});
     });

};

exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		 connection.query('SELECT * from categories', [], function(err, rows) {
		    res.render('addprod', {
		    	categories:rows
		    });
   });
 });
};


exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
      		product_name : input.product_name,
		category_id : input.category_id
  	};
		connection.query('insert into products set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/products');
		});
	});
};
exports.mostPopularProduct =function(req, res, next){
		req.getConnection(function(err, connection){
		   connection.query('SELECT products.product_name, SUM( sales.qty ) AS qty FROM sales INNER JOIN products ON sales.product_id = products.product_id GROUP BY products.product_name ORDER BY qty DESC LIMIT 1', [], function(err, rows){
    		   if (err) next(err);
    		   res.render('mostPopularItem', {
    		   	mostPopularItem : rows
    		   });
    		});
		});
};
exports.leastpopularProd =function(req, res, next){
		req.getConnection(function(err, connection){
		   connection.query('SELECT products.product_name, SUM( sales.qty ) AS qty FROM sales INNER JOIN products ON sales.product_id = products.product_id GROUP BY products.product_name ORDER BY qty ASC LIMIT 1', [], function(err, rows){
    		   if (err) next(err);
    		   res.render('leastPopularProduct', {
    		   	leastPopularProduct: rows
    		   });
    		});
		});
};
exports.EarningperProd = function(req, res, next){
	req.getConnection(function(err, connection){
	connection.query('SELECT products.product_name, SUM(sales.qty * sales.sales_price)AS Earnings FROM sales INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON categories.category_id = products.category_id GROUP BY products.product_name ORDER BY Earnings DESC', [], function(err, rows){
    		   if (err)
    		   	return next(err);
    		   res.render('ProductEarnings', {
    		   	 ProductEarnings: rows
    		   });
    		});
		});
		};
		exports.ProfitperProd = function(req, res, next){
			req.getConnection(function(err, connection){
			connection.query('SELECT product_name, supplier_name, SUM(sales_price-cost_price) AS profit FROM products, sales, purchases, suppliers WHERE products.product_id = sales.product_id And sales.product_id = purchases.product_id AND purchases.supplier_id = suppliers.supplier_id GROUP BY product_name  ORDER BY Profit DESC', [], function(err, rows){
		    		   if (err)
		    		   	return next(err);
		    		   res.render('ProductProfit', {
		    		   	 ProductProfit: rows
		    		   });
		    		});
				});
				};
		exports.search = function(req, res, next){
			req.getConnection(function(err, connection){
 			var searchVal = '%'+ req.params.searchVal +'%';
			console.log(searchVal);
			connection.query('SELECT product_id, product_name from products where product_name like ?',[searchVal] ,function(err, results) {
					if (err) return next(err);
									res.render('search_products',{
			 						products: results,
									layout: false
		 				});
					});
				});
	};

exports.get = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('SELECT  * FROM products WHERE product_id = ?', [id], function(err,rows){
			if (err) return next(err);
				res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
			});
		});
	};
	exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		 connection.query('UPDATE products SET ? WHERE product_id = ?', [data, id], function(err, rows){
    		   if (err) next(err);
            res.redirect('/products');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('DELETE FROM products WHERE product_id = ?', [id], function(err,rows){
		  if(err) return next(err);
		    res.redirect('/products');
		});
	});
};

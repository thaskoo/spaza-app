exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT * from categories', [], function(err, results) {
        	     if (err) return next(err);
    		      res.render('categories', {
		       // no_products : results.length === 0,
		           categories : results,
    	});
    	});
     });
   
};

exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		 connection.query('SELECT * from categories', [], function(err, results) {
		    res.render('add', {
		    categories:results
		});
   });
 });
};
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
      		category_name : input.category_name,
      		category_id : input.category_id
  	};
		connection.query('insert into categories set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/categories');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('SELECT  * FROM categories WHERE category_id = ?', [id], function(err,rows){
			if (err) return next(err);
				res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
			});
		});
	};
	exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		 connection.query('UPDATE categories SET ? WHERE category_id = ?', [data, id], function(err, rows){
    		   if (err) 
    		   	return next(err);
            res.redirect('/categories');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE category_id = ?', [id], function(err,rows){
		  if(err) return next(err);
		    res.redirect('/categories');
		});
	});
};
exports.mostPopularCat =function(req, res, next){
		req.getConnection(function(err, connection){
		   connection.query('SELECT categories.category_name, SUM(sales.qty)AS qty FROM sales INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON products.category_id = categories.category_id GROUP BY categories.category_name ORDER BY SUM(sales.qty)DESC LIMIT 0,1', [], function(err, rows){
    		   if (err) 
    		   		return next(err);
    		   res.render('mostCategory', {
    		   	mostCategory : rows
    		   });
    		});
		});
};

exports.leastPopularCat = function(req, res, next){
	req.getConnection(function(err, connection){
	connection.query('SELECT categories.category_name, SUM(sales.qty)AS qty FROM sales INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON categories.category_id = products.category_id GROUP BY categories.category_name ORDER BY qty ASC LIMIT 1', [], function(err, rows){
    		   if (err) 
    		   	return next(err);
    		   res.render('leastPopularCategory', {
    		   	leastPopularCategory : rows
    		   });
    		});
		});
		};

exports.EarningperCat = function(req, res, next){
	req.getConnection(function(err, connection){
	connection.query('SELECT categories.category_name, SUM(sales.qty * sales.sales_price)AS Earnings FROM sales INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON categories.category_id = products.category_id GROUP BY categories.category_name ORDER BY Earnings DESC', [], function(err, rows){
    		   if (err) 
    		   	return next(err);
    		   res.render('CategoryEarnings', {
    		   	CategoryEarnings : rows
    		   });
    		});
		});
		};
		exports.ProfitperCat = function(req, res, next){
	req.getConnection(function(err, connection){
	connection.query('SELECT categories.category_name, SUM(sales.qty * sales.sales_price)AS Earnings FROM sales INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON categories.category_id = products.category_id GROUP BY categories.category_name ORDER BY Earnings DESC', [], function(err, rows){
    		   if (err) 
    		   	return next(err);
    		   res.render('CategoryProfit', {
    		   	CategoryProfit : rows
    		   });
    		});
		});
		};
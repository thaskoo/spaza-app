exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT sale_id, product_name,DATE_FORMAT(sales_date,"%d %M %y") AS sales_date , sales_price, qty, product_name from sales INNER JOIN products ON products.product_id = sales.product_id', [], function(err, results) {
			if (err) return next(err);
			connection.query('select * from products', function(err, products){
    	     	if (err) return next(err);
		      	res.render( 'sales', {
	          		products:products,
	          		sales : results
				});
 			});
		});
	});
};

exports.showaddSales = function(req, res, next){
	req.getConnection(function(err, connection){
		 connection.query('select * from products', function(err, results) {
	if(err)
		return next(err);
		    res.render('showaddSales',{
			products : products
	});
    });
 });
	console.log(results);
};
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
		   product_id : input.product_id,
      		sales_date : input.sales_date,
		    sales_price : input.sales_price,
		    qty : input.qty

  	};
		connection.query('insert into sales set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/sales');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	 req.getConnection(function(err, connection){
		connection.query('SELECT  * FROM sales WHERE sale_id = ?', [id], function(err,rows){
			if (err) return next(err);

			connection.query('SELECT  * FROM products', function(err,products){
				if(err) return next(err);
				res.render('editSales',{page_title:"Edit Customers - Node.js",
					data : rows[0],
					products : products
				});
	       	});
  		});
	});
};
exports.search = function(req, res, next){
	req.getConnection(function(err, connection){
	var searchVal = '%'+ req.body.searchVal +'%';
	connection.query('SELECT sale_id, product_name,DATE_FORMAT(sales_date,"%d %M %y") AS sales_date , sales_price, qty, product_name from sales INNER JOIN products ON products.product_id = sales.product_id like ?',[searchVal],function(err, results){
			if (err)
					return next(err);
							res.render('sales',{
							sales: results
				});
			});
		});
	};
exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		        connection.query('UPDATE sales SET ? WHERE id = ?', [data,id], function(err, rows){
    		   if (err) next(err);
                res.redirect('/sales');
    		});
    });
};
exports.delete = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE sale_id = ? ', [id], function(err,rows){
		  if(err) return next(err);
		    res.redirect('/sales');
		});
	});
};

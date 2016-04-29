exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT products.product_name, purchases.qty, DATE_FORMAT(purchases.stock_date,"%d/%m/%y")as stock_date, purchases.cost_price, suppliers.supplier_name FROM purchases INNER JOIN products ON products.product_id = purchases.product_id INNER JOIN suppliers ON suppliers.supplier_id = purchases.supplier_id', [], function(err, results) {
	         	if (err) return next(err);
	         connection.query('SELECT * from products', [], function(err, products) {
	         	 connection.query('SELECT * from suppliers', [], function(err, suppliers) {
	         	 	if (err) return next(err);
		      	    res.render('purchases', {
		      	    	purchases:results,
		      	    	products:products,
	          		    suppliers : suppliers
    	});
    	});
     });
});
});
};

exports.showAdd= function(req, res){
	req.getConnection(function(err, connection){
		 connection.query('SELECT * from suppliers', [], function(err, results) {
		    res.render('purchases', {
		    	suppliers:results
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
		   qty : input.qty,
		   stock_date : input.stock_date,
		   cost_price : input.cost_price,
		   supplier_name : input.supplier_name
  	};
		connection.query('insert into products set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/purchases');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('SELECT  * FROM purchases WHERE purchases_id = ?', [id], function(err,rows){
			if (err) return next(err);
				res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
			});
		});
	};
	exports.search = function(req, res, next){
		req.getConnection(function(err, connection){
		var searchVal = '%'+ req.params.searchVal +'%';
		connection.query('SELECT products.product_name, purchases.qty, DATE_FORMAT(purchases.stock_date,"%d/%m/%y")as stock_date, purchases.cost_price, suppliers.supplier_name FROM purchases INNER JOIN products ON products.product_id = purchases.product_id INNER JOIN suppliers ON suppliers.supplier_id = purchases.supplier_id where product_name like ?',[searchVal],function(err, results){
				if (err)
						return next(err);
								res.render('search_purchases',{
								purchases: results,
								layout: false
					});
				});
			});
		};
	exports.update = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		 connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows){
    		   if (err) next(err);
            res.redirect('/purchases');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('DELETE FROM purchases WHERE product_id = ?', [id], function(err,rows){
		  if(err) return next(err);
		    res.redirect('/purchases');
		});
	});
};

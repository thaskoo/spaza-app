exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT stock_purchases_csv.quantity, stock_purchases_csv.date, stock_purchases_csv.cost, products.product_id, suppliers.supplier_id FROM stock_purchases_csv INNER JOIN products ON products.product_name = stock_purchases_csv.item INNER JOIN suppliers ON suppliers.supplier_name = stock_purchases_csv.shop', [], function(err, results) {
	         	if (err) return next(err);
	         connection.query('SELECT * from products', [], function(err, results) {
	         	 connection.query('SELECT * from suppliers', [], function(err, results) {
	         	 	if (err) return next(err);
		      	    res.render('purchases', {
		      	    	purchases:results,
		      	    	products:results,
	          		    suppliers : results
    	});
    	});
     });
});
});
};

exports.showAdd= function(req, res){
	req.getConnection(function(err, connection){
		 connection.query('SELECT * from purchases', [], function(err, results) {
		    res.render('add', {

		    	purchases:results
		    });
   });
 });
};


exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
      		//product_name : input.product_name,
      		//sales_date: input.sales_date.
		    category_id : input.category_id
  	};
		connection.query('insert into purchases set ?', data, function(err, results) {
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
				res.render('editPurchases',{page_title:"Edit Customers - Node.js", data : rows[0]});
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
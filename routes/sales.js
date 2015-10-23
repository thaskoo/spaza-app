exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT product_name, sales_date, sales_price, qty, product_name from sales INNER JOIN products ON products.product_id = sales.product_id', [], function(err, results) {
        	     if (err) return next(err);
    		      res.render( 'sales', {
		        //sales : results.length === 0,
		          products : results,
    	});
     });
   });
};

exports.addSales = function(req, res, next){

	req.getConnection(function(err, connection){
		 connection.query('insert into sales SET ?', function(err, results) {
	if(err)
		return next(err);

		    res.render('addSales',{
			products : results,
	});
    });
 });
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		sales_date : input.sales_date,
		 sales_price : input. sales_price,
		 qty : input.qty,
		 product_id : input.product_id
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
		connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
				res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

/*
exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		 connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
    		   if (err) next(err);
                     res.redirect('/sales');
    		});

    });
};
exports.delete = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
		  if(err) return next(err);
		    res.redirect('/sales');
		});
	});
};
*/

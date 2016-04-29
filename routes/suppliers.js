exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);

		connection.query('SELECT * FROM suppliers', [], function(err, results) {
					res.render('suppliers', {
						suppliers: results,

    		});
    	});
    });
};

exports.showAddSuppliers = function (req, res) {
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM suppliers', function(err, suppliers) {
			res.render('suppliers', {
			suppliers : suppliers
			});
		});
	});
};
exports.search = function(req, res, next){
	req.getConnection(function(err, connection){
	var searchVal = '%'+ req.params.searchVal +'%';
	connection.query('SELECT supplier_name from suppliers where supplier_name like ?',[searchVal] ,function(err, results) {
			if (err)
					return next(err);
							res.render('search_suppliers',{
							suppliers : results,
							layout: false
				});
			});
		});
};
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err)
			return next(err);


		// get the data from the user & put it in a map that match your db columns
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			supplier_name : input.supplier_name,
		};

		connection.query('insert into suppliers set ?', data, function(err, results) {
			if (err) return next(err);
			res.redirect('/suppliers');
		});
	});
};
exports.get = function(req, res, next){
		var id = req.params.id;
		req.getConnection(function(err, connection){
		connection.query('SELECT * FROM suppliers WHERE id = ?', [id], function(err,rows){
				if(err){
			//console.log("Error Selecting : %s ",err );
			}
		res.render('editSuppliers',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};
exports.update = function(req, res, next){
		var data = JSON.parse(JSON.stringify(req.body));
		var id = req.params.id;
		req.getConnection(function(err, connection){
			connection.query('UPDATE suppliers SET ? WHERE Id = ?', [data, id], function(err, rows){
					if (err){
				//console.log("Error Updating : %s ",err );
					}
				res.redirect('/suppliers');
		});
	});
};
exports.delete = function(req, res, next){
		var id = req.params.id;
			req.getConnection(function(err, connection){
			connection.query('DELETE FROM suppliers WHERE id = ?', [id], function(err){
					if(err){
				//console.log("Error Selecting : %s ",err );
					}
				res.redirect('/suppliers');
		});
	});
};

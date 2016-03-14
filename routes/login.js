exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		   connection.query('SELECT * from login', [], function(err, results) {
        	     if (err) return next(err);
    		      res.render( 'home2', {
		           login : results
    	});
    	});
     });
   
};
exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		 connection.query('SELECT * from LOGIN', [], function(err, LOGIN) {
		    res.render('add', {LOGIN:LOGIN});
   });
 });
};
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
      		user_name : input.user_name,
		    email : input.email,
		    password : input.password
  	};
		connection.query('insert into login set ?', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/LOGIN');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	   req.getConnection(function(err, connection){
		connection.query('SELECT  * FROM login WHERE id = ?', [id], function(err,rows){
			if (err) return next(err);
				res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});
			});
		});
	};
	exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
           var id = req.params.id;
              req.getConnection(function(err, connection){
		 connection.query('UPDATE login SET ? WHERE id = ?', [data, id], function(err, rows){
    		   if (err) next(err);
            res.redirect('/login');
    		});

    });
};

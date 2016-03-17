	var data = {
      		user_name : input.user_name,
		     password : input.password,
  	};
		connection.query('select * from users', data, function(err, results) {
  		if (err) return next(err);
			res.redirect('/home');
		});
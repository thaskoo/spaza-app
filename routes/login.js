exports.login = function (req, res, next) {
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
			res.redirect('/login');
		});
	});
};

var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('login');
};


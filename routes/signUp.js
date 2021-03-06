var bcrypt = require('bcrypt');

 exports.signUp = function (req, res, next) {
 		req.getConnection(function(err, connection){
 			if (err)
          return next(err);
				var input = JSON.parse(JSON.stringify(req.body));
					var password = input.password;

				var data = {
      				username : input.username,
		     		     roles : "admin"
  	}; 

  	 bcrypt.genSalt(10, function(err, salt) {
      	bcrypt.hash(password, salt, function(err, hash) {
      		data.password = hash;

			connection.query('insert into users set ?', data, function(err, data) {
  			if (err) {
             res.redirect('/signUp');
  		}
  		else {
			res.redirect('/');
		}

		});
	});
  });
});
};

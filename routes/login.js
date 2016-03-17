exports.login = function(req, res, next){
	var user_name = req.body.user_name;
  var  password = req.body.password;


req.getConnection(function(err, connection){
		connection.query('SELECT * FROM users WHERE username = ?',user_name, function(err,users){
      if(password === users[0].password) { // checking if users is on the database
        res.redirect("/home");
      }
			 
      else {
        res.redirect("/");
				
        }
		});
	});
};
exports.login = function(req, res, next){
  req.getConnection(function(err, connection){
	var username = req.body.username;
  var  password = req.body.password;



		connection.query('SELECT * FROM users ', username, function(err,users){
      if(password === users[0].password) { // checking if users is on the database
        res.redirect("/home");
      }
			 
      else {
           res.redirect("/login");
         };
		});
	});
};
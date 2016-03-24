exports.users = function (req, res, next) {
 	req.getConnection(function(err, connection){
 		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
	});
};
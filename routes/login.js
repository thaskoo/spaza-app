var bcrypt = require('bcrypt');
exports.login = function(req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var username = req.body.username;
    var password = req.body.password;

    req.getConnection(function(err, connection) {

        connection.query('SELECT * FROM users where username = ?', username, function(err, users) {
            var user = users[0];
            if (user === undefined) { // checking if users is on the database
              req.flash('message', 'Invalid username');
                return res.redirect("/");

            }

            bcrypt.compare(password, user.password, function(err, pass) {
                if (pass) {
                    return res.redirect("/home");
                } else {
                    req.flash('message', 'Invalid password');
                    return res.redirect("/");

                }
            });
        });
    });
};

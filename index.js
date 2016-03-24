'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser');
    var session = require('express-session');
    var bcrypt = require('bcrypt');

    

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: 3306,
      database: 'spaza_app'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Generate a salt
var salt = bcrypt.genSaltSync(3);

// Hash the password with the salt
var hash = bcrypt.hashSync("Athini", salt);

var hash = bcrypt.hashSync("Athini", 3);

bcrypt.compareSync("Athini", hash);
bcrypt.compareSync("not my password", hash);

app.use(session({ secret: 'keyboard cat',saveUninitialized :false,resave : true, cookie: { maxAge: 60000 }}))


app.post('/', function(req, res) {

});
app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json());

var products = require('./routes/products'),
     sales = require ('./routes/sales'),
     categories = require("./routes/categories"),
     login = require('./routes/login'),
     signup = require('./routes/signUp'),
     purchases = require ('./routes/purchases');

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
};

app.get ("/", function(req, res){
  res.render('home_spaza');
   layout: false;
});
app.get ("/", function(req, res){
  res.render('homeSales');
});
app.get ("/", function(req, res){
  res.render("/home");
  //layout: false;
});

app.post("/login", function(req, res){
  req.session.user = "Thaskoo";
  res.redirect("/home");
});
app.post("/signUp", function(req, res){
  req.session.user = "Thaskoo";
  res.redirect("/signUp");
});

var checkUser = function(req, res, next){
  console.log("checkUser...");
   if(req.session.user){ //checking the user
      return next();
    }
    res.redirect("/login");
};
app.get("/home", checkUser, function(req, res){
    res.render("home",{user : req.session.user});//information to my handlebars
});

app.get("/login", function(req, res){
    res.render("login", {});
});
app.get("/signup", function(req, res){
    res.render("signup", {});
});


/*var userRole = {
    Nelisa : admin,
    Xolani : admin,
};
*/
/*app.post("/login", function(req, res){
  req.session.user = req.body.username; //logging in as a user Lhita
  res.redirect("/home");
}); */

 app.get("/logout", function(req, res){
  delete req.session.user; //deleting the user for the session
  res.redirect("/login");  //redirecting to login
 });

//setup the handlers
app.get('/products', products.show);
//app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/addprod', products.showAdd);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

//app.get('/', sales.show);
app.get('/sales', sales.show);
//app.get('/sales/addSales', sales.get);
app.get('/sales/editSales/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.get('/sales/add', sales.showaddSales);
app.post('/sales/add', sales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:id', sales.delete);


//setup the handlers
app.get('/purchases', purchases.show);
//app.get('/products', products.show);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.get('/purchases/add', purchases.showAdd);
app.post('/purchases/add', purchases.add);
app.get('/products/mostPopularItem', products.mostPopularProduct);
app.get('/products/leastPopularProduct', products.leastpopularProd);
app.get('/products/ProductEarnings', products.EarningperProd);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/purchases/delete/:id', purchases.delete);


//setup the handlers
app.get('/categories', categories.show);
//app.get('/products', products.show);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/mostCategory', categories.mostPopularCat);
app.get('/categories/leastPopularCategory', categories.leastPopularCat);
app.get('/categories/CategoryEarnings', categories.EarningperCat);
app.get('/categories/CategoryProfit', categories.ProfitperCat);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categories.delete);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
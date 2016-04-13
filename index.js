'use strict';

var express = require('express'),
    flash = require('express-flash'),
  // bcrypt = require('bcrypt');
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser');
    var session = require('express-session');


var app = express();
//app.use(flash());

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
 app.use(flash());

var products = require('./routes/products'),
     sales = require ('./routes/sales'),
     categories = require("./routes/categories"),
     login = require('./routes/login'),
     signUp = require('./routes/signUp'),
     suppliers = require('./routes/suppliers'),
     purchases = require('./routes/purchases')

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
};
//setup the handlers
app.get('/', function(req, res) {
    res.render('login', {
      layout: false,

    });
  });

app.post("/login", login.login);

//setup the handlers
app.post("/signup",signUp.signUp);

app.get ("/signup", function(req, res){
  res.render('signup', {
    layout:false,
  });
});

var checkUser = function(req, res, next){
   if(req.session.user){ //checking the user
      return next();
    }
    res.redirect("/");
};

app.get("/home",  function(req, res){
    res.render("home");//information to my handlebars
});
//app.use(checkUser);

app.get('/logout', function(req, res){
delete req.session.user
res.redirect('/');
});

//setup the handlers
app.post('/products/search', products.search);
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id',products.update);
// app.get('/products/addprod',  products.showAdd);
// app.post('/products/add',  products.add);
app.get('/products/mostPopularItem', products.mostPopularProduct);
app.get('/products/leastPopularProduct', products.leastpopularProd);
app.get('/products/ProductEarnings',  products.EarningperProd);

//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

//app.get('/', sales.show);
app.get('/sales', sales.show);
//app.get('/sales/addSales', sales.get);
app.get('/sales/editSales/:id', sales.get);
app.post('/sales/update/:id',  sales.update);
app.get('/sales/add', sales.showaddSales);
app.post('/sales/add', sales.add);
app.post('/sales/search',  sales.search);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:id', sales.delete);


//setup the handlers
app.get('/purchases', purchases.show);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id',  purchases.update);
app.get('/purchases/add', purchases.showAdd);
app.post('/purchases/add', purchases.add);
app.post('/purchases/search',  purchases.search);
// app.post('/purchases/search',  purchases.search);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/purchases/delete/:id',  purchases.delete);

//setup the handlers
app.get('/suppliers', suppliers.show);
app.get('/suppliers/editSuppliers/:id', suppliers.get);
app.post('/suppliers/update/:id', suppliers.update);
app.get('suppliers/add', suppliers.showAddSuppliers);
app.post('/suppliers/add', suppliers.add);
app.post('/suppliers/search',  suppliers.search);
app.get('/suppliers/search',  suppliers.search);
app.get('/suppliers/delete/:id', suppliers.delete);

//setup the handlers
app.get('/categories', categories.show);
//app.get('/products', products.show);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id',  categories.update);
app.get('/categories/add',  categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/mostCategory',  categories.mostPopularCat);
app.get('/categories/leastPopularCategory', categories.leastPopularCat);
app.get('/categories/CategoryEarnings',  categories.EarningperCat);
app.get('/categories/CategoryProfit', categories.ProfitperCat);
app.post('/categories/search',  categories.search);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categories.delete);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3003;

//start everything up
app.listen(portNumber, function () {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);

});

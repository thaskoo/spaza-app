'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    products = require('./routes/products'),
    sales = require('./routes/sales');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'coder123',
      port: 3306,
      database: 'spaza_app'
};
//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

//setup the handlers

app.get('/', products.show);
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

//app.use(errorHandler);

//setup the handlers
//app.get('/', sales.show);
app.get('/sales', sales.show);
app.get('/sales/editSales/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.get('/sales/add', sales.addSales);
app.post('/sales/add', sales.add);

app.get('/sales/delete/:id', sales.delete);
//app.use(errorHandler);


//configure the port number using and environment number
//var portNumber = process.env.CRUD_PORT_NR || 3000;

//start everything up
//app.listen(portNumber, function () {
// console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
//});
//app.listen(3000);
 var port = process.env.PORT || 3000;
 var server = app.listen(port, function () {

     var host = server.address().address;
     var port = server.address().port;

     console.log('Example app listening at http://%s:%s', host, port);

   });

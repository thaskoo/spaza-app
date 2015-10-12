DROP TABLE IF EXISTS `categories`;
create table categories(
   category_id int not null auto_increment,
        category_name VARCHAR(50),
	primary key(category_id)
);

DROP TABLE IF EXISTS `products`;
create table products(
   product_id int not null auto_increment,
        product_name VARCHAR(100),
	category_id int,
	primary key(product_id),
	foreign key(category_id) REFERENCES categories(category_id)
);

DROP TABLE IF EXISTS `suppliers`;
create table suppliers(
   supplier_id int not null auto_increment,
        supplier_name VARCHAR(50),
	primary key(supplier_id)
);
DROP TABLE IF EXISTS `sales`;
create table sales (
   sale_id int not null auto_increment,
        sales_price int,
	qty int,
	product_id int,
	primary key(sale_id),
	foreign key(product_id) REFERENCES products(product_id)
);
DROP TABLE IF EXISTS `purchases`;
create table purchases (
   purchase_id int not null auto_increment,
	qty int,
	cost_price int,
	product_id int,
	supplier_id int,
	primary key(purchase_id),
	foreign key(product_id) REFERENCES products(product_id),
	foreign key(supplier_id) REFERENCES suppliers(supplier_id)
	
);
DROP TABLE IF EXISTS `mostProd`;
create table mostProd (
	mostProd_id int not null auto_increment,
	product_name VARCHAR(100),
	foreign key(product_id) REFERENCES products(product_id),
	primary key(mostProd_id)
);



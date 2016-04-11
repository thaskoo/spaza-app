
DROP TABLE IF EXISTS `categories`;
create table categories(
   category_id int not null auto_increment,
        category_name VARCHAR(50),
	  primary key(category_id),
	constraint uc_category_name unique (category_name)
);

DROP TABLE IF EXISTS `products`;
create table products(
   product_id int not null auto_increment,
        product_name VARCHAR(100),
	 category_name VARCHAR(50),
	  category_id int,
	   primary key(product_id),
	     foreign key(category_id) REFERENCES categories(category_id),
	     constraint uc_product_name unique (product_name)
);
DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE suppliers (
	id int NOT NULL AUTO_INCREMENT,
	supplier_name VARCHAR(50)NOT NULL,
	primary key(id)
	);

DROP TABLE IF EXISTS `sales`;
create table sales (
   sale_id int not null auto_increment,
	sales_date date not null,
     sales_price int,
	    qty int,
	      product_id int,
	       primary key(sale_id),
	        foreign key(product_id) REFERENCES products(product_id)
);

DROP TABLE IF EXISTS `purchases`;
 create table purchases (
  id int NOT NULL AUTO_INCREMENT,
	qty int,
	cost_price int,
	stock_date date not null,
	product_id int,
	supplier_id int,
	 primary key(id),
	 foreign key(product_id) REFERENCES products(product_id),
	 foreign key(supplier_id) REFERENCES suppliers(supplier_id)
	 );

DROP TABLE if exist users;
CREATE TABLE users (
	 id int not null auto_increment primary key,
	 username varchar(100),
	 password varchar(100),
	 roles varchar(100)
);

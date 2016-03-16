SELECT categories.category_name, SUM(sales.sales_price) - SUM(purchases.cost_price)AS profit FROM sales 
INNER JOIN products ON sales.product_id = products.product_id 
INNER JOIN purchases ON sales.product_id = purchases.product_id 
INNER JOIN categories ON categories.category_id = products.category_id GROUP BY categories.category_name 
ORDER BY profit DESC; 
SELECT categories.category_name, SUM(sales.qty * sales.sales_price)AS Earnings FROM sales 
INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON categories.category_id = products.category_id GROUP BY categories.category_name 
ORDER BY Earnings DESC
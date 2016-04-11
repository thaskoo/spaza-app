SELECT products.product_name, SUM(sales.qty * sales.sales_price)AS Earnings FROM sales 
INNER JOIN products ON sales.product_id = products.product_id INNER JOIN categories ON products.category_id = products.category_id GROUP BY products.product_name 
ORDER BY Earnings DESC;
SELECT categories.category_name, SUM(sales.qty)AS qty FROM sales 
INNER JOIN products ON products.product_id = products.product_id 
INNER JOIN categories ON products.category_id = categories.category_id
GROUP BY categories.category_name 
ORDER BY SUM(sales.qty)DESC LIMIT 0,1
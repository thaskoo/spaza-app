INSERT INTO sales (sales_date,sales_price,qty,product_id)
SELECT sales_csv.date, sales_csv.sales_price, sales_csv.no_sold, products.product_id
FROM sales_csv 
INNER JOIN products ON products.product_name = sales_csv.stock_item;


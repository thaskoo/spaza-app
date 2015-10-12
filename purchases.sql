INSERT INTO purchases (cost_price,qty,product_id,supplier_id)
SELECT stock_purchases_csv.quantity, stock_purchases_csv.cost,products.product_id,suppliers.supplier_id
FROM stock_purchases_csv
INNER JOIN products ON products.product_name = stock_purchases_csv.item
INNER JOIN suppliers ON suppliers.supplier_name = stock_purchases_csv.shop;
 

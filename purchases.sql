SELECT products.product_name, purchases.qty, purchases.stock_date, purchases.cost_price, suppliers.supplier_name
FROM purchases
INNER JOIN products ON products.product_id = purchases.product_id
INNER JOIN suppliers ON suppliers.supplier_id = purchases.supplier_id
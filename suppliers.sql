INSERT INTO suppliers (supplier_name) 
SELECT DISTINCT shop FROM stock_purchases_csv; 

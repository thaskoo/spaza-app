SELECT stock_item, SUM(no_sold) AS totalsold
FROM sales_csv
GROUP BY stock_item
ORDER BY totalsold DESC
LIMIT 1;

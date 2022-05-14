/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,     
    customer_id INTEGER REFERENCES customers(id)
)
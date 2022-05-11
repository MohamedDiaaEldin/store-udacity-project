/* Replace with your SQL commands */
CREATE TABLE orders (id SERIAL PRIMARY KEY , quantity INTEGER, user_id INTEGER REFERENCES customers(id), product_id INTEGER REFERENCES products(id)) ;
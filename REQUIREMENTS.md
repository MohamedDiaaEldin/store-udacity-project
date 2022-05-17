#  server setup 
    index.ts is the start point 
    server runs on loopback ip port 5000
    database server runs on port 5432


#  End points

### Login - Logout
- POST /login
- get /logout

### products
-  GET /products     - index 
-  GET /prodcuts/:id  - show
-  POST /prodcuts    - create [token required]

### users
-  GET /cutsomers     - index [token required] 
-  GET /cutsomers/:id  - show [token required]
-  POST /cutsomers     - create  [token required]

### users
-  GET /orders/:user_id - show [token required] 
-  POST /orders/         - create [token required] 

### login - logout 
- POST /login 
- GET /logout


##  Database schema 
### Cutsomer 
- id: integer (pk)
- first_name : varchar(30)
- last_name : varchar(30)
- password : varchar(150)

### products
- id : integer (pk)
- name : varchar(100)
- price : double 

### orders
- id :integer (pk)
- customer : customer_id (fk)

### orders_products
- id : integre  (pk)
- quantity : integer
- order_id : integer  (fk)
- product_id : integer (fk)


### env variables   .env file should include 
    ENV=dev
    PGHOST=127.0.0.1
    PGUSER=mohamed
    PGDATABASE=store
    PGDATABASETEST=store_test
    PGPASSWORD=123
    PGPORT=5432

    BCRYPT_PASSWORD=de-pass
    SALT_ROUNDS=10
    TOKEN_SECRET=learning
    JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoibW9oYW1lZCIsImlkIjoxLCJpYXQiOjE2NTI3MzYzOTZ9.Qs2AFuIZA5Y6d-di__CSOg6Rf7bdhE6ReocXZJYrXH4
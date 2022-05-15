#  server setup 
    index.ts is the start point 
    server runs on loopback ip port 5000
    database server runs on port 5432


#  End points

### products
-  GET /products     - index 
-  GET /prodcuts/:id  - show
-  POST /prodcuts    - create [token required]


### users
-  POST /cutsomers     - index [token required] 
-  POST /cutsomers/:id  - show [token required]
-  POST /cutsomers     - create  

### users
-  POST /orders/:user_id - show [token required] 
-  POST /orders/         - create [token required] 




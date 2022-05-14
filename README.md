# Project setup 
### install node modules 
    npm install 
    npm install db-migrate db-migrate-pg 

### run the serve
    db-migrate --env dev up:all
    npm run start

## setup database
    -  postgres docker :
        docker run -d -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=mohamed -e POSTGRES_DB=store --net="host" -v /path/to/data:/var/lib/postgres/data postgres    
     
    - create test database :
        CREATE DATABASE store_test ;

    OR 
     - create user mohamed 
        CREATE USER mohamed SUPERUSER WITH PASSWORD '123'; 
     -Login again with mohamed user 
     - create databases 
        CREATE DATABASE store ;
        CREATE DATABASE store_test ;


## run the unit tests
    npm run start-test
    npm run test
    
    store.postman.json to test all end points locally

# backend End points

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

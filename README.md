# Project setup 
### install node modules 
    npm install 
    npm install db-migrate db-migrate-pg 

### run the serve
    db-migrate --env dev up:all
    npm run start

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
-  POST /orders/:user_id - orders [token required] 

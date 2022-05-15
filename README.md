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
        CREATE USER mohamed SUPERUSER WITH PASSWORD '123';                   
        CREATE DATABASE store ;
        CREATE DATABASE store_test ;


## run unit tests
    npm run start-test
    npm run test

    store.postman.json to test all end points locally

## project requirments 
REQUIREMENTS.md 
database-design directory
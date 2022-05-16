# Project setup 
### install node modules 
    npm install 
    npm install db-migrate db-migrate-pg 



## database setup
    -  postgres docker :
        docker run -d -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=mohamed -e POSTGRES_DB=store --net="host" -v /path/to/data:/var/lib/postgres/data postgres    
     
    - create test database :
        CREATE DATABASE store_test ;

    OR         
        CREATE USER mohamed SUPERUSER WITH PASSWORD '123';                   
        CREATE DATABASE store ;
        CREATE DATABASE store_test ;

### server run
    db-migrate --env dev up:all
    npm run start

## unit tests run
    npm run start-test
    npm run test

    store.postman.json to test all end points locally

## project requirments 
REQUIREMENTS.md 
database-design 

## Highlighted changes - review 
- Mention column type for database schema 
- Add .env to .gitignore.
- Use correct HTTP verb for all routes.
- Use try/catch with async/await functions.
- Set jwt as a part of headers instead of body. 

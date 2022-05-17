# Project setup 


## database setup
    -  postgres docker :
        docker run -d -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=mohamed -e POSTGRES_DB=store --net="host" -v /path/to/data:/var/lib/postgres/data postgres    
     
    - create test database :
        CREATE DATABASE store_test ;

    OR         
        CREATE USER mohamed SUPERUSER WITH PASSWORD '123';                   
        CREATE DATABASE store ;
        CREATE DATABASE store_test ;


###  docker image for project 
    image contains node , nvm , npm on user mohamed
    
    run docker image by 
        docker run --net="host" -v /path/to/app_folder:/app -it mohameddiaaeldin/ubuntu:node bash

    su mohamed 
    cd app
    npm install 
    npm install db-migrate db-migrate-pg 

        
### install node modules 
    npm install 
    npm install db-migrate db-migrate-pg 



### server run
    db-migrate --env dev up:all
    npm run start

## unit tests run    
    npm run test
    store.postman.json to test all end points locally

## project requirments 
REQUIREMENTS.md 
database-design 

## Highlighted changes - review 
- add unit test for each end point
- Mention column type for database schema 
- Add .env to .gitignore.
- Use correct HTTP verb for all routes.
- Use try/catch with async/await functions.
- Set jwt as a part of headers instead of body. 
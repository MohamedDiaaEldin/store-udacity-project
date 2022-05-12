
- design database 
- migrate database

- implement modals and handler for each entity 

    todos 
        - implement customer hundlers and endpoints 
        - postman test 
        - jasmin test 


- implement jwt middelware







install migration 
    npm install -g db-migrate
    npm  add db-migrate db-migrate-pg

create migration 
    db-migrate create books-table --sql-file
    db-migrate up
    db-migrate down
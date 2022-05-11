
- design database 
- migrate database

- implement jwt middelware
- implement modals and handler for each entity 


install migration 
    npm install -g db-migrate
    npm  add db-migrate db-migrate-pg

create migration 
    db-migrate create books-table --sql-file
    db-migrate up
    db-migrate down
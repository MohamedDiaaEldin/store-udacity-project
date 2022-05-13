TODO
- implement product models and handlers
- product unit test  


install migration 
    npm install -g db-migrate
    npm  add db-migrate db-migrate-pg

create migration 
    db-migrate create books-table --sql-file
    db-migrate up
    db-migrate down
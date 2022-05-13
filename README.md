TODO
- implement orders modles and handlers
- implement orders unit tests


install migration 
    npm install -g db-migrate
    npm  add db-migrate db-migrate-pg

create migration 
    db-migrate create books-table --sql-file
    db-migrate up
    db-migrate down
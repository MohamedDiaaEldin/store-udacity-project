auth section 



/// last section readme 
database.ts-> connect to postgresql databae using pg

install migration 
    npm install -g db-migrate
    npm  add db-migrate db-migrate-pg

create migration 
    db-migrate create books-table --sql-file
    db-migrate up
    db-migrate down
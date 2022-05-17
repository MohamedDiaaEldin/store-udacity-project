require('dotenv').config()
import {Pool } from 'pg'
// const { Client } = require('pg').Client



const ENV = process.env.ENV

const {
    PGPORT,
    PGDATABSE,
    PGHOST,
    POSTGRES_DB_TEST,
    PGUSER,
    PGPASSWORD
} = process.env

let pool: Pool;

if (ENV === "test") {
    pool = new Pool({
        user: PGUSER,
        host: PGHOST,
        database: POSTGRES_DB_TEST,
        port: (PGPORT as unknown) as number,
        password: PGPASSWORD
    })
}
else {
    pool = new Pool({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABSE,
        port: (PGDATABSE as unknown) as number,
        password: PGPASSWORD
    })
}


export default pool

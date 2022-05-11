require('dotenv').config()
import { Pool } from 'pg'


const ENV = process.env.ENV

const {
    PORT,
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env

let pg_pool: Pool;

if (ENV === "test") {
    pg_pool = new Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        port: (PORT as unknown) as number,
        password: POSTGRES_PASSWORD
    })
}
else {
    pg_pool = new Pool({
        user: POSTGRES_USER,
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: (PORT as unknown) as number,
        password: POSTGRES_PASSWORD
    })
}


export default pg_pool

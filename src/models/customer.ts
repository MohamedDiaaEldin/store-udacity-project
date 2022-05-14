import { Pool} from "pg";
import pg_pool from "../databse";
require('dotenv').config()
const bcrypt = require('bcrypt');

export type Customer = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

export class CustomerStore {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }
    async index(): Promise<Customer[]> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = "SELECT * FROM customers ;"
            const result = await this.pool.query(sql)

            conn.release()
            return result.rows
        }
        catch (err) {
            if (conn != null) {
                conn.release()
            }
            this.pool.end()
            throw new Error('error while selection customer ' + err)
        }
    }
    async authenticate(first_name: string, password: string): Promise<Customer | null> {
        let conn;
        try {
            conn = await pg_pool.connect()
            const sql = "SELECT  password, id FROM customers WHERE first_name=$1"

            const result = await conn.query(sql, [first_name])
            if (result.rows.length) {
                const user = result.rows[0]
                if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    conn.release()                    
                    return user
                }
            }

            conn.release()
            return null
        }
        catch (error) {
            if (conn != null) {
                conn.release()
            }
            throw new Error('error while validating user ' + error)
        }
    }
    
    async show(id: number): Promise<Customer> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = 'SELECT * FROM customers WHERE id=$1'
            const result = await conn.query(sql, [id])
            // const order = result.rows[0]
            conn.release()
            console.log(result.rows )
            return result.rows[0]
        }
        catch (err) {
            if (conn != null) {
                conn.release()
            }
            this.pool.end()
            throw new Error('error while selecting customer ' + err)
        }
    }
    
    async create(customer: Customer): Promise<Customer> {
        let conn;
        try {

            conn = await this.pool.connect()
            const sql = "insert into customers (first_name, last_name, password ) values ($1, $2, $3)"

            // password hashing
            const hashed_pass = bcrypt.hashSync(customer.password + process.env.BCRYPT_PASSWORD, parseInt(String(process.env.SALT_ROUNDS)))
            const result = await conn.query(sql, [customer.first_name, customer.last_name, hashed_pass])
            const pro = result.rows[0]

            conn.release()
            return pro
        }
        catch (error) {
            if (conn != null) {
                conn.release()
            }
            this.pool.end()
            throw new Error('error while inserting new customer, ' + error)
        }
    }

    async end() {
        this.pool.end()
    }
}



/// manual testing

// const run = async () => {
//     const customer_store = new CustomerStore(pg_pool)
//     await customer_store.create({ first_name: "abdelrhman", last_name: "ali", password: "adkjahd.." }).then(res => console.log(res)).catch(err => console.log(err))
    // customer_store.authenticate("mohamed", "mohamed12..").then(res => console.log("returned ", res)).catch(err => console.log(err))

    //     await customer_store.index().then(res => {
    //         console.log(res)
    //         // for (const row in res) {
    //         //     console.log(row)
    //         // }

    //     }).catch(err => {
    //         console.log(err)

    //     })

        // await customer_store.show(1).then(res=>console.log(res)).catch(err=>console.log(err))

//     customer_store.end()
// }

// run()

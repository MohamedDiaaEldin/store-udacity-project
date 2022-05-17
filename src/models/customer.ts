import pool from "../databse";
require('dotenv').config()
const bcrypt = require('bcrypt');

export type Customer = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

export class CustomerStore {
    

    async index(): Promise<Customer[]> {        
        try {
            const client = await pool.connect()            
            const sql = "SELECT * FROM customers ;"
            const result = await pool.query(sql)
            client.release(true)
                      

            return result.rows
        }
        catch (err) {                       
            await  pool.end()            
            throw new Error('error while selection customer ' + err)
        }
    }
    async authenticate(first_name: string, password: string): Promise<Customer | null> {
        try {
            const client = await pool.connect()
            const sql = "SELECT  password, id FROM customers WHERE first_name=$1"

            const result = await pool.query(sql, [first_name])
            if (result.rows.length) {
                const user = result.rows[0]
                if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    client.release(true)                    
                    return user
                }
            }            
            return null
        }
        catch (error) {
            pool.end()
            throw new Error('error while validating user ' + error)
        }
    }

    async show(id: number): Promise<Customer> {

        try {
            const client = await pool.connect()
            const sql = 'SELECT * FROM customers WHERE id=$1'
            const result = await pool.query(sql, [id])
            // const order = result.rows[0]
            client.release(true)            
            console.log(result.rows)
            return result.rows[0]
        }
        catch (err) {
            await pool.end()        
            throw new Error('error while selecting customer ' + err)
        }
    }

    async create(customer: Customer): Promise<Customer> {

        try {
            const client = await pool.connect()
            const sql = "insert into customers (first_name, last_name, password ) values ($1, $2, $3)"

            // password hashing
            const hashed_pass = bcrypt.hashSync(customer.password + process.env.BCRYPT_PASSWORD, parseInt(String(process.env.SALT_ROUNDS)))
            const result = await pool.query(sql, [customer.first_name, customer.last_name, hashed_pass])
            const pro = result.rows[0]

            client.release(true)            
            return pro
        }
        catch (error) {
            await  pool.end()
            throw new Error('error while inserting new customer, ' + error)
        }
    }

    
}



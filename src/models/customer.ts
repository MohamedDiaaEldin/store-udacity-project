import { Pool, PoolClient } from "pg";
import pg_pool from "../databse";

export type Customer = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

class CustomerStore {
    pool:Pool
    
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
    async show(id: number): Promise<Customer> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = 'SELECT * FROM customers WHERE id=$1'
            const result = await conn.query(sql, [id])
            const order = result.rows[0]            

            conn.release()
            return order
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
            const result = await conn.query(sql, [customer.first_name, customer.last_name, customer.password])
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

    async end(){
        this.pool.end()
    }
}


// new CustomerStore().index().then(res=>{
//     console.log(res)
//     for (const row in res){
//         console.log(row)
//     }
// })



// const run = async  ()=>{
//     const customer_store = new CustomerStore(pg_pool)
//     await customer_store.create({ first_name: "mohamed", last_name: "diaa", password: "mohamed12.." }).then(res => console.log(res)).catch(err => console.log(err))
//     await customer_store.index().then(res => {
//         console.log(res)
//         // for (const row in res) {
//         //     console.log(row)
//         // }

//     }).catch(err => {
//         console.log(err)

//     })

//     await customer_store.show(5).then(res=>console.log(res)).catch(err=>console.log(err))
    
//     customer_store.end()
// }

// run()

import { Pool } from "pg";
import pg_pool from "../databse";

type Order = {
    id:number,
    customer_id:number    
}
export class OrderStore {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }

    // select by id 
    // return product name , quantity , price  
    async create(customer_id: number): Promise<Order[] | null> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = "INSERT INTO orders (customer_id) values ($1) ; "
            const result = await conn.query(sql, [customer_id])
            conn.release()

            if (result.rows.length > 0) {
                return result.rows
            }
            return null
        }
        catch (error) {
            throw new Error('error while selecting user orders')
        }
    }
    async end() {
        this.pool.end()
    }

}


// const run = async()=> {
//     const order_store = new OrderStore(pg_pool)
//     order_store.create(1)
//     order_store.end()
// }
// run()
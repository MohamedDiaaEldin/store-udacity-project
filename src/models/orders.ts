import { Pool } from "pg";
import pg_pool from "../databse";

type OrderInfo = {
    name: string,
    quantity: number,
    total_price: number
}
export class OrderStore {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }

    // select by id 
    // return product name , quantity , price  

    async order(user_id: number): Promise<OrderInfo[] | null> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = "SELECT name , quantity, price FROM orders INNER JOIN  products on products.id = orders.product_id  WHERE orders.user_id=$1 ;"
            const result = await conn.query(sql, [user_id])
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
//     order_store.order(150).then(res=>console.log("res:", res)).catch(err=>console.log(err))
//     order_store.end()
// }
// run()
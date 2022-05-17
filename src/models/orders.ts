import pool from "../databse";

type Order = {
    id:number,
    customer_id:number    
}
export class OrderStore {
    

    // select by id 
    // return product name , quantity , price  
    async create(customer_id: number): Promise<Order[] | null> {
    
        try {
            const client = await pool.connect()
            const sql = "INSERT INTO orders (customer_id) values ($1) ; "
            const result = await pool.query(sql, [customer_id])
            client.release(true)

            if (result.rows.length > 0) {
                return result.rows
            }
            return null
        }
        catch (error) {
            await pool.end()
            throw new Error('error while selecting user orders')
        }
    }

}

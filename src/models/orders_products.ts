import pool from "../databse";
import { OrderStore } from "./orders";


type ProductIno = {
    product_name : string,
    quantity:number, 
    price:number
}

export class ProductOrderStore {
    async create(customer_id: number, quantity: number, product_id: number) {
        
        try {

            /// create new order 
            const order_store = new OrderStore()
            await order_store.create(customer_id)

            //  get lased_added id 
            const client  = await pool.connect()
            const order_id_sql = 'SELECT last_value FROM orders_id_seq ; '
            const product_order_sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) ;'
            let result = await pool.query(order_id_sql)
            const order_id = result.rows[0].last_value            

            result = await pool.query(product_order_sql, [quantity, Number(order_id), product_id])
            client.release(true)
            

        }
        catch (error) {
            await  pool.end()
            throw new Error('error while inserting new order ' + error)
        }
    }
    async show(customer_id:number):Promise<ProductIno[]>{
        
        try{
           const client = await pool.connect()
            const sql = "select quantity, price, name  from orders inner join orders_products on orders_products.order_id = orders.id  inner join products on orders_products.product_id = products.id and orders.customer_id  =  $1 ;"
            const result = await pool.query(sql,[customer_id])
            //close connection             
            client.release(true)
            
            return result.rows
        }
        catch( error){
            await  pool.end()
            throw new Error('error while selecting user orders ' + error)
        }
        
    }

    
}


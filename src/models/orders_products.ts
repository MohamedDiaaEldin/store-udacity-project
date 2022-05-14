import e from "express";
import { Pool } from "pg";
import pg_pool from "../databse";
import { OrderStore } from "./orders";

type ProductOrder = {
    id: number,
    quantity: number,
    order_id: number,
    product: number
}

type ProductIno = {
    product_name : string,
    quantity:number, 
    price:number
}

export class ProductOrderStore {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }
    async create(customer_id: number, quantity: number, product_id: number) {
        let conn;
        try {

            /// create new order 
            const order_store = new OrderStore(this.pool)
            await order_store.create(customer_id)

            //  get lased_added id 
            conn = await this.pool.connect()
            const order_id_sql = 'SELECT last_value FROM orders_id_seq ; '
            const product_order_sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES ($1, $2, $3) ;'
            let result = await conn.query(order_id_sql)
            const order_id = result.rows[0].last_value
            console.log(Number(order_id))
            console.log(typeof(Number(order_id)))

            result = await conn.query(product_order_sql, [quantity, Number(order_id), product_id])
            conn.release()

        }
        catch (error) {
            if(conn!=null){
                // close pool connection 
                this.end()
            }
            throw new Error('error while inserting new order ' + error)
        }
    }
    async show(customer_id:number):Promise<ProductIno[]>{
        let conn ; 
        try{
            conn = await this.pool.connect()
            const sql = "select quantity, price, name  from orders inner join orders_products on orders_products.order_id = orders.id  inner join products on orders_products.product_id = products.id and orders.customer_id  =  $1 ;"
            const result = await conn.query(sql,[customer_id])
            
            //close connection 
            conn.release()
            
            return result.rows
        }
        catch( error){
            if(conn!=null){
                //  end pool conection 
                this.end()
            }
            throw new Error('error while selecting user orders ' + error)
        }
        
    }

    async end() {
        await this.pool.end()
    }
}
// const run = async () => {
//     const pr = new  ProductOrderStore(pg_pool)

//     // await pr.create(2, 1, 3)

//     await pr.show(2).then(res=>{
//         console.log(res)
//     }).catch(err=>console.log(err))

//     await pr.end()

// }

// run()
import { Pool } from "pg";
import pg_pool from "../databse";


export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductStore {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool;
    }
    async index(): Promise<Product[]> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = "select * from products"

            const result = await conn.query(sql)
            conn.release()

            return result.rows

        }
        catch (err) {
            if (conn != null) {
                conn.release()
            }
            this.end()
            throw new Error('error while selecting all products ' + err)
        }

    }
    async show(id: number): Promise<Product> {
        let conn;
        try {
            conn = await this.pool.connect()
            const sql = 'SELECT * FROM products WHERE id=$1'
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
            throw new Error('error while selecting product with id ' + err)
        }
    }
    async create(product: Product): Promise<Product> {
        let conn;
        try {

            conn = await this.pool.connect()
            const sql = "insert into products (name, price ) values ($1, $2)"

            const result = await conn.query(sql, [product.name, product.price])
            const pro = result.rows[0]

            conn.release()
            return pro
        }
        catch (error) {
            if (conn != null) {
                conn.release()
            }
            this.pool.end()
            throw new Error('error while inserting new product, ' + error)
        }
    }
    async end() {
        this.pool.end()
    }
}


// const run = async () => {

//     const pro = new ProductStore(pg_pool)


//     // pro.create({name:"laptop", price:1000}).then(res=>console.log(res)).catch(err=>console.log(err))

//     /// test index    
//     await pro.index().then(res=>console.log(res)).catch(err=>console.log(err))

//     await pro.show(1).then(res=>console.log(res)).catch(err=>console.log(err))

//     pro.end()
// }
// run()


import pool from "../databse";


export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductStore {

    async index(): Promise<Product[]> {

        try {
            const client  = await pool.connect()
            const sql = "select * from products"

            const result = await pool.query(sql)
            client.release(true)
            return result.rows

        }
        catch (err) {
            await pool.end()
            throw new Error('error while selecting all products ' + err)
        }

    }

    async show(id: number): Promise<Product> {

        try {
            const client = await pool.connect()
            const sql = 'SELECT * FROM products WHERE id=$1'
            const result = await pool.query(sql, [id])
            const order = result.rows[0]

            client.release(true)
            return order
        }
        catch (err) {
            await pool.end()
            throw new Error('error while selecting product with id ' + err)
        }
    }

    async create(product: Product): Promise<Product> {

        try {

            const client = await pool.connect()
            const sql = "insert into products (name, price ) values ($1, $2)"

            const result = await pool.query(sql, [product.name, product.price])
            const pro = result.rows[0]

            client.release(true)
            return pro
        }
        catch (error) {
            await pool.end()
            throw new Error('error while inserting new product, ' + error)
        }
    }


}


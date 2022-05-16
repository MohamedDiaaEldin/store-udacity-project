import { Request, Response, Application } from 'express'
import pg_pool from '../databse'
import { verify } from '../utilities/verify';
import { ProductStore, Product } from '../models/products';

const product_store = new ProductStore(pg_pool)

export const is_valid_prodcut_data = (data: Product) => {
    return (data && data.name && data.price) ? true : false
}
const index = async (req: Request, res: Response) => {
    const products = await product_store.index()
    console.log(products)
    res.json(products)
}
const show = async (req: Request, res: Response) => {
    const product = await product_store.show(Number(req.params.id))
    res.json(product)
}
const create = async (req: Request, res: Response) => {
    // 
    if (!is_valid_prodcut_data(req.body)) {
        res.statusCode = 400
        res.json({ status_code: 400, message: "bad request" })
    }
    else {
        await product_store.create({ name: req.body.name, price: req.body.price })
        res.json({status_code:200, message:"product added successfully"})
    }
}

export const products_routes = (app: Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/', verify, create)
}




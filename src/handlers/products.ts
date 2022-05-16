import { Request, Response, Application } from 'express'
import pg_pool from '../databse'
import { verify } from '../utilities/verify';
import { ProductStore, Product } from '../models/products';
import { bad_request, server_error, success } from './ServerMessages';

const product_store = new ProductStore(pg_pool)

export const is_valid_prodcut_data = (data: Product) => {
    return (data && data.name && data.price) ? true : false
}
const index = async (req: Request, res: Response) => {
    try{
        const products = await product_store.index()
        console.log(products)
        res.json(products)

    }
    catch (error) {
        console.error('error while getting all products ' + error)
        res.json(server_error)
    }
}
const show = async (req: Request, res: Response) => {
    try{

        const product = await product_store.show(Number(req.params.id))
        res.json(product)
    }
    catch (error) {
        console.error('error while getting product by id ' + error)
        res.json(server_error)
    }
    
}
const create = async (req: Request, res: Response) => {
    try{
        // 
        if (!is_valid_prodcut_data(req.body)) {
            res.statusCode = 400
            res.json(bad_request)
        }
        else {
            await product_store.create({ name: req.body.name, price: req.body.price })
            res.json(success)
        }

    }
    catch (error) {
        console.error('error while create new product ' + error)
        res.json(server_error)
    }
}

export const products_routes = (app: Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/', verify, create)
}




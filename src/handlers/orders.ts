import { Application, Request, Response } from "express";
import pg_pool from "../databse";
import { OrderStore } from "../models/orders";
import { ProductOrderStore } from "../models/orders_products";
import { verify } from "../utilities/verify";



const order_store = new ProductOrderStore(pg_pool)
type OrderData = {
    customer_id: number,
    quantity: number,
    product_id: number,
}

const is_valid_order_request = (data: OrderData) => {
    return (data && data.customer_id && data.quantity && data.product_id) ? true : false
}

// get all orders data using user id 
const show = async (req: Request, res: Response) => {
    const user_products = await order_store.show(Number(req.params.user_id))

    if (user_products.length === 0) {
        res.statusCode = 404
        res.json({ status_code: 404, message: "user or products not found" })

    }
    else {
        res.json(user_products)
    }

}

const create = async (req: Request, res: Response) => {
    // validate request body 
    if (!is_valid_order_request) {
        res.statusCode = 400
        res.json({ status_code: 400, message: 'bad request' })
        return
    }

    // create new order 
    await order_store.create(Number(req.body.customer_id), Number(req.body.quantity), Number(req.body.product_id))
    res.json({"status_code":200, message:"order added successfully"})
}

export const orders_handler = (app: Application) => {
    app.post('/orders/:user_id', verify, show)
    app.post('/orders/', verify, create)
}
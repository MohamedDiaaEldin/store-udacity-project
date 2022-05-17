import { Application, Request, Response } from "express";
import { ProductOrderStore } from "../models/orders_products";
import { verify } from "../utilities/verify";
import { bad_request, not_found, server_error, success } from "./ServerMessages";



const order_store = new ProductOrderStore()
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
    try {
        const user_products = await order_store.show(Number(req.params.user_id))

        if (user_products.length === 0) {
            res.statusCode = 404
            res.json(not_found)
        }
        else {
            res.json(user_products)
        }

    }
    catch (error) {
        console.error('error while getting all orders ' + error)
        res.json(server_error)
    }

}

const create = async (req: Request, res: Response) => {

    try{
        // validate request body 
        if (!is_valid_order_request) {
            res.statusCode = 400
            res.json(bad_request)
            return
        }
    
        // create new order 
        await order_store.create(Number(req.body.customer_id), Number(req.body.quantity), Number(req.body.product_id))
        res.json(success)

    }
    catch (error) {
        console.error('error while creating new order ' + error)
        res.json(server_error)
    }

}

export const orders_handler = (app: Application) => {
    app.get('/orders/:user_id', verify, show)
    app.post('/orders/', verify, create)
}
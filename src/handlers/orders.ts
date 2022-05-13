import { Application, Request, Response } from "express";
import pg_pool from "../databse";
import { OrderStore } from "../models/orders";
import { verify_middle } from "../utilities/verify";



const order_store = new OrderStore(pg_pool)
const get_order = async (req: Request, res: Response) => {
    const user_products = await order_store.order(Number(req.params.user_id))
    console.log(user_products)
    if (user_products === null) {
        res.statusCode = 404
        res.json({ status_code: 404, message: "user or products not found" })

    }
    else {
        res.json(user_products)
    }

}

export const orders_handler = (app: Application) => {
    app.post('/orders/:user_id', verify_middle, get_order)
}
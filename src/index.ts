require('dotenv').config()
import express, { Request, Response } from 'express'
import customer_routes from './handlers/customer'

import { products_routes } from './handlers/products'
import { orders_handler } from './handlers/orders'
import { cookie_parser } from './utilities/cookieParser'

const app: express.Application = express()
const host = '0.0.0.0'
const port = 5000


const cors_options = {
    origin: ' http://localhost:1234',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cookie_parser)

customer_routes(app)
products_routes(app)
orders_handler(app)

app.listen(port, host, () => {
    console.log(`server runing on ${host}:${port}`)
})
export default app


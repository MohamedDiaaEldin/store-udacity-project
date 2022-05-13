import  { Request, Response, Application } from 'express'
import pg_pool from '../databse'
import { Customer, CustomerStore } from '../models/customer'
import { make_jwt } from '../utilities/auth';
import { verify_middle } from '../utilities/verify';


const customer_store = new CustomerStore(pg_pool)

type LoginData = {first_name:string, password:string}
export const is_valid_request_data = (body: Customer): Boolean => {
    return (body && body.first_name && body.last_name && body.password) ? true : false
}

const is_valid_loign_data =(data:LoginData)=>{
    return (data && data.first_name && data.password)? true  : false
}


const index = async (_req: Request, res: Response) => {
    const customers = await customer_store.index()
    res.json(customers)
}

const show = async (req: Request, res: Response) => {
    const customer = await customer_store.show(Number(req.params.id))
    res.json(customer)
}


const create = async (req: Request, res: Response) => {
    // console.log(req.body.email)
    if (!is_valid_request_data(req.body)) {
        res.statusCode = 400
        res.json({ status_code: 400, message: "bad request" })
    }
    const new_customer = await customer_store.create(req.body)
    customer_store.end()
    res.json({ status_code: 200, message: "user added successfully" })
}

const login = async (req:Request, res:Response)=>{
    // validate data
    if( ! is_valid_loign_data(req.body)){
        res.statusCode = 400
        res.json({ status_code: 400, message: "bad request" })
    }

    // authenticate user 
    const user_data = await customer_store.authenticate(req.body.first_name, req.body.password)

    if (user_data){
        // generate jwt 
        const data  = {first_name:req.body.first_name, id:Number(user_data.id)}
        const token = make_jwt(data)    

        // send jwt 
        res.json({status_code:200, "jwt":token})
    }
    else{
        // send not valid credintials
        res.statusCode = 401
        res.json({status_code:401, message:"not authorized user"})
    }
}

const customer_routes = (app: Application) => {
  
    app.get('/customers', verify_middle,  index)
    app.get('/customers/:id', verify_middle, show)
    app.post('/customers', create)
    app.post('/login', login)    
}

export default customer_routes
import  { Request, Response, Application } from 'express'
import { Customer, CustomerStore } from '../models/customer'
import { make_jwt } from '../utilities/auth';
import { verify } from '../utilities/verify';
import { bad_request, server_error, success, unauthorized } from './ServerMessages';


const customer_store = new CustomerStore()

type LoginData = {first_name:string, password:string}
export const is_valid_request_data = (body: Customer): Boolean => {
    return (body && body.first_name && body.last_name && body.password) ? true : false
}

const is_valid_loign_data =(data:LoginData)=>{
    return (data && data.first_name && data.password)? true  : false
}


const index = async (_req: Request, res: Response) => {
    try{
    const customers = await customer_store.index()
        res.json(customers)
    }
    catch(error){
        console.log('error while get all customers ' + error)
        res.json(server_error)
    }
}

const show = async (req: Request, res: Response) => {        
    try{
        const customer = await customer_store.show(Number(req.params.id))
        res.json({"customer":customer})    
    }
    catch(error){
        console.log('error while gettting customer by id ' + error)
        
    }
}


const create = async (req: Request, res: Response) => {
    try{
        // console.log(req.body.email)
        if (!is_valid_request_data(req.body)) {
            res.statusCode = 400
            res.json(bad_request)
            return
        }
        console.log(req.body)
        const new_customer = await customer_store.create(req.body)
        res.json(success)
    }
    catch(error){
        console.log('error while creating new customer ' + error)
        res.json(server_error)
    }

}

const login = async (req:Request, res:Response)=>{
    // validate data
    if( ! is_valid_loign_data(req.body)){
        res.statusCode = 400
        res.json(bad_request)
        return
    }

    // authenticate user 
    const user_data = await customer_store.authenticate(req.body.first_name, req.body.password)

    if (user_data){
        // generate jwt 
        const data  = {first_name:req.body.first_name, id:Number(user_data.id)}
        const token = make_jwt(data)    
        // send jwt 
        res.cookie('jwt', token)
        res.json(success)
    }
    else{
        // send not valid credintials
        res.statusCode = 401
        res.json(unauthorized)
    }
}
const logout = async (req:Request, res:Response)=>{
    res.clearCookie('jwt')
    res.send('loged out')
}
const customer_routes = (app: Application) => {
    app.get('/customers', verify,  index)
    app.get('/customers/:id', verify, show)
    app.post('/customers', verify, create)
    /// 
    app.post('/login', login)    
    app.get('/logout', logout)    
}

export default customer_routes
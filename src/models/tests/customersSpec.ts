import pg_pool from "../../databse"
import {CustomerStore} from "../../models/customer"

describe("test customer model",  ()=>{
    const customer_store = new CustomerStore(pg_pool)
    const first_user = {id:1,first_name:"first name test user", last_name:"second name test user", password:"pass123"}

    it("test index " , async()=>{
        const result = await customer_store.index()
        expect(result).toEqual([first_user])

    })   

    it("test show" , async()=>{
        const result = await customer_store.show(1)
        expect(result).toEqual(first_user)

    })
    
})
import {is_valid_request_data } from '../../handlers/customer'

describe("test customer model",  ()=>{
    it("test show" , async()=>{
        
        const valid_user_data = {first_name:"mohamed", last_name:"diaa", password:"123"}
        const not_valid_user_data = {first_name:"", last_name:"", password:""}
        
        expect(is_valid_request_data(valid_user_data)).toBeTruthy()
        expect(is_valid_request_data(not_valid_user_data)).toBeFalsy()
    })
    
})
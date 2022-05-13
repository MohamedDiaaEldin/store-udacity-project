import { is_valid_prodcut_data } from '../../handlers/products'

describe("test customer model",  ()=>{
    it("test show" , async()=>{
        
        const valid_product_data = {name:"mac laptop", price:25000}
        const not_valid_product_data =  {name:"", price:25000}
        
        expect(is_valid_prodcut_data(valid_product_data)).toBeTruthy()
        expect(is_valid_prodcut_data(not_valid_product_data)).toBeFalsy()
    })
    
})
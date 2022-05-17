import supertest from "supertest";
import app from "../../index";

describe('authentication end points Test ', ()=>{


    //POST login 
    it('GET /login', async function() {    
        // create new customer 
        const new_customer = {first_name:"udacity_user", last_name:"diaa", password:"1328796465"}
        await supertest(app).post('/customers/').set('Cookie', [`jwt=${process.env.JWT}`]).send(new_customer).expect(200);
        await supertest(app).post('/login').set('Cookie', [`jwt=${process.env.JWT}`]).send({first_name:new_customer.first_name, password:new_customer.password}).expect(200);
      });
    //GET logout
    it('GET /logout', async function() {            
        await supertest(app).get('/logout/').set('Cookie', [`jwt=${process.env.JWT}`]).expect(200);
      });

    
})

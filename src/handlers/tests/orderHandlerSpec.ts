import supertest from "supertest";
import app from "../../index";

describe('Orders end points Test ', ()=>{

    it('GET /orders/:id', async function() {              
        await supertest(app).get('/customers/2').set('Cookie', [`jwt=${process.env.JWT}`]).expect(200);
      });

    it('GET /orders/:id', async function() {              
        await supertest(app).get('/customers/2').expect(401);
      });
})

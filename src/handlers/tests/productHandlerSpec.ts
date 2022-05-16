import supertest from "supertest";
import app from "../../index";


describe('Products end point Test ', ()=>{
    beforeAll( (done)=> {        
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        done()
    });


    ///  GET /products 
    it('GET /products', async function() {              
        await supertest(app).get('/products/').expect(200);
    });
    

    // GET products 
    it('GET /products/:id', async function() {              
        await supertest(app).get('/products/2').expect(200);
    });

    // POST products 
    const new_product = {name:"tv screen", price:15200}
    it('POST /products', async function() {              
        await supertest(app).post('/products').set('Cookie', [`jwt=${process.env.JWT}`]).send(new_product).expect(200);
    });
    it('POST /products - bad request body', async function() {              
        await supertest(app).post('/products').set('Cookie', [`jwt=${process.env.JWT}`]).expect(400);
    });
    it('POST /products - bad request body', async function() {              
        await supertest(app).post('/products').send(new_product).expect(401);
    });

})
import supertest from 'supertest';
import app from '../../index';
require('dotenv').config()


describe('/Customer end points - Test ', function() {


    // GET /customer test 
    it('GET /customers  200', async function() {
      // status code should be 200 `OK`
      await supertest(app).get('/customers').set('Cookie', [`jwt=${process.env.JWT}`]).expect(200);
    });
    it('GET /customers  401 - Unauthorized - without jwt in cookies', async function() {
      await supertest(app).get('/customers').expect(401);
    });    



    /// GET /customer:id test 
    it('GET /customers/:id ', async function() {              
      await supertest(app).get('/customers/2').set('Cookie', [`jwt=${process.env.JWT}`]).expect(200);
    });
    it('GET /customers/:id - without jwt', async function() {              
      await supertest(app).get('/customers/2').expect(401);
    });
  

    // POST /customer:id
    const new_customer = {first_name:"user test", last_name:"diaa", password:"1328796465"}
    it('GET /customers/ ', async function() {              
        await supertest(app).post('/customers/').set('Cookie', [`jwt=${process.env.JWT}`]).send(new_customer).expect(200);
      });   
    it('GET /customers/:id without jwt', async function() {              
        await supertest(app).get('/customers/2').expect(401);
      }); 
      it('GET /customers/:id without jwt - bad request body', async function() {              
        await supertest(app).post('/customers/').set('Cookie', [`jwt=${process.env.JWT}`]).expect(400);
      });

  });

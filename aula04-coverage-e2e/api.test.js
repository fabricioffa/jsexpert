const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert');

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200);

      assert.deepStrictEqual(response.text, 'Contact us page');
    });
  });
  
  describe('/hello', () => {
    it('should request an unexisting route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200);

      assert.deepStrictEqual(response.text, 'Hello, world');
    });
  });
  
  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({username: 'Fabrício', password: '123456'})
        .expect(200);

      assert.deepStrictEqual(response.text, 'Login has succeeded');
    });

    it('should fail when credentials does not match and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({username: 'hacker', password: '123'})
        .expect(401);
      
      assert.deepStrictEqual(response.unauthorized, true);
      assert.deepStrictEqual(response.text, 'Login failed');
    });
  });
});

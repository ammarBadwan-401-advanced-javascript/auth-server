'use strict';

const supergoose = require('@code-fellows/supergoose');
const serverModule = require('../src/server');
const server = serverModule.server;
const mockRequest = supergoose(server);
const base64 = require('base-64');


describe('Signup and signin',()=>{
  it('it can signup succesfully',()=>{
    let obj = {
      username: 'Tester',
      password: 'testPass',
    };
    return mockRequest
      .post('/signup')
      .send(obj)
      .then(data=>{
        expect(data.status).toBe(201);
      });
  });
  let token;

  it('it can signin succesfully, it also tests the middleware',()=>{
    let encodedUser = base64.encode('Tester:testPass');
    return mockRequest
      .post('/signin')
      .set('Authorization',`Basic ${encodedUser}`)
      .then(result=>{
        token = result.body.token;
        expect(result.body.user.username).toBe('Tester');
      });
  });
    
  it('it will fail signin with wrong password',()=>{
    let encodedUser = base64.encode('Tester:wrongPass');
    return mockRequest
      .post('/signin')
      .set('Authorization',`Basic ${encodedUser}`)
      .then(result=>{
        expect(result.status).toBe(500);
      });
  });

  it('it can retrieve all users succesfully',()=>{
    return mockRequest
      .get('/users')
      .then(result=>{
        expect(result.body[0]).toBeTruthy();
      });
  });

  it('it will let us go in the route with a bearer token',()=>{
    return mockRequest
      .get('/read')
      .set('Authorization',`Bearer ${token}`)
      .then(result=>{
        expect(result.status).toBe(200);
      });
  });

  it('it will NOT let us access without bearer token',()=>{
    return mockRequest
      .get('/read')
      .then(result=>{
        expect(result.status).toBe(500);
      });
  });

  it('it will NOT let us go in the route with regular role rights(write route)',()=>{
    return mockRequest
      .post('/add')
      .set('Authorization',`Bearer ${token}`)
      .then(result=>{
        expect(result.status).toBe(500);
      });
  });



});
require('dotenv').config({ path: '../.env' });
const request = require('supertest');
const { expect } = require('chai');
const { createTestDatabase, testPool } = require('../config/database');
const { app } = require('../app'); 

describe('User API Tests', function () {
  before(async function () {
    this.timeout(10000)
    await createTestDatabase()
  })

  after(async function () {
    await testPool.query('DELETE FROM users')
  })

  let testUser = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'Test123!',
    role: 'buyer',
    birth_date: '2000-01-01'
  };

  describe('POST /signup', function () {
    it('should register a new user', async function () {
      const res = await request(app)
        .post('autoshop.ba/signup')
        .send(testUser);

      expect(res.status).to.equal(302);
      expect(res.header.location).to.include('/autoshop.ba/login');
    });

    it('should not register a user with an existing email', async function () {
      const res = await request(app)
        .post('/signup')
        .send(testUser);

      expect(res.status).to.equal(401);
      expect(res.text).to.include('User already exists');
    });
  });

  describe('POST /login', function () {
    it('should log in a valid user and return a token', async function () {
      const res = await request(app)
        .post('/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(res.status).to.equal(200);
      expect(res.headers['set-cookie']).to.exist;
    });

    it('should reject login with incorrect password', async function () {
      const res = await request(app)
        .post('/login')
        .send({ email: testUser.email, password: 'WrongPassword' });

      expect(res.status).to.equal(401);
      expect(res.body.error).to.equal('Invalid password!');
    });

    it('should reject login for non-existent user', async function () {
      const res = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@example.com', password: 'Test123!' });

      expect(res.status).to.equal(401);
      expect(res.body.error).to.equal('User does not exist!');
    });
  });
});

const supertest = require('supertest')
const { app, server } = require('../../index')
const { userModel } = require('../modules')

let token = ''
let re_token = ''
let id

beforeAll(async () => {
  const data = {
    password: '123456',
    email: 'admin@gmail.com'
  }
  const response = await supertest(app).post('/account/login').send(data)
  token = response.body.access_token
  re_token = response.body.refresh_token
})

describe('Accout API', () => {
  test('Post /account/register/ --> register user', async () => {
    const data = {
      email: 'test13@gmail.com',
      password: '123456'
    }
    return supertest(app)
      .post('/account/register')
      .send(data)
      .expect(200)
      .then(async (response) => {
        expect(response.statusCode).toBe(200)
      })
  })

    test('Get /account/verify/:token --> register user', async () => {
      const data = {
        email: 'test13@gmail.com',
        password: '123456'
      }
      return supertest(app)
        .get(`/account/verify/${token}`)
        .send(data)
        .expect(200)
        .then(async (response) => {
          expect(response.statusCode).toBe(200)
        })
    })
  
  test('Post /account/reset_password/ --> reset_password user', async () => {
    const data = {
      email: 'test2@gmail.com'
    }
    return supertest(app)
      .post('/account/reset-password')
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Post /account/login/ --> login user', async () => {
    const data = {
      password: '123456',
      email: 'test@gmail.com'
    }
    return supertest(app)
      .post('/account/login')
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.access_token)
      })
  })

  test('Post /account/refresh-token/ --> login user', async () => {
    const data = {
      rf_token: re_token
    }
    return supertest(app)
      .post('/account/refresh-token')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.access_token)
      })
  })

  test('Post /account/update-admin/ --> update-admin user', async () => {
    const data = {
      email: 'test2@gmail.com',
      role: 'admin'
    }
    return supertest(app)
      .post('/account/update-admin')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ msg: 'success' })
        expect(response.statusCode).toBe(200)
      })
  })
})

afterAll(async () => {
  await server.close()
})

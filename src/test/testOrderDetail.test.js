const supertest = require('supertest')
const { app, server } = require('../../index')
let token = ''

beforeAll(async () => {
  const data = {
    password: '123456',
    email: 'admin@gmail.com'
  }
  const response = await supertest(app).post('/account/login').send(data)
  token = response.body.access_token
})

describe('order details API', () => {
  test('Get /order-details/ --> array order-details', async () => {
    return supertest(app)
      .get('/order-details')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Get /order-details/:id --> array user', async () => {
    return supertest(app)
      .get(`/order-details/2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Put /order-details/:id --> array order-details', async () => {
    const data = {
      qty: '20',
    }
    return supertest(app)
      .put(`/order-details/8`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
        .then((response) => {
          expect(response.body).toEqual({ msg: 'update a order details' })
        expect(response.statusCode).toBe(200)
      })
  })

  test('Delete /order-details/ --> delete user', async () => {
    return supertest(app)
      .delete(`/order-details/120`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ msg: 'delete success' })
        expect(response.statusCode).toBe(200)
      })
  })
})

afterAll(async () => {
  await server.close()
})
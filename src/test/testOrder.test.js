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

describe('orders API', () => {
  test('Get /orders/all --> array orders', async () => {
    return supertest(app)
      .get('/orders/all')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Get /orders/ --> array orders', async () => {
    return supertest(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Get /orders/:id --> array order', async () => {
    return supertest(app)
      .get(`/orders/2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Post /orders/ --> Post order', async () => {
    const data = {
      name: 'Nhien An1',
      phone: '0123456890',
      address: 'Hà Nội',
      order_details: [
        {
          product_id: '1',
          qty: '2'
        },
        {
          product_id: '2',
          qty: '1'
        }
      ]
    }
    return supertest(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Put /orders/:id --> array orders', async () => {
    const data = {
      name: 'Nhien_up2',
      phone: '0123456890',
      address: 'Hà Nội'
    }
    return supertest(app)
      .put(`/orders/6`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Delete /orders/ --> delete order', async () => {
    return supertest(app)
      .delete(`/orders/58`)
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
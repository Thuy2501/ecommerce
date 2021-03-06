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

describe('Products API', () => {
  test('Get /products/ --> array products', async () => {
    return supertest(app)
      .get('/products')
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Get /products/:id --> array user', async () => {
    return supertest(app)
      .get(`/products/2`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Post /products/ --> Post user', async () => {
    const data = {
      name: 'apple4',
      price: '12'
    }
    return supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Put /products/:id --> array products', async () => {
    const data = {
      name: 'oto',
      price: '12'
    }
    return supertest(app)
      .put(`/products/8`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Delete /products/ --> delete user', async () => {
    return supertest(app)
      .delete(`/products/12`)
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
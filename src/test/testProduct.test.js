const supertest = require('supertest')
const { app, server } = require('../../index')

describe('Products API', () => {
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
})

afterAll(async () => {
  await server.close()
})
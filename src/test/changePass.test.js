const supertest = require('supertest')
const { app, server } = require('../../index')

let token = ''

beforeAll(async () => {
  const data = {
    password: '123456',
    email: 'test4@gmail.com'
  }
  const response = await supertest(app).post('/account/login').send(data)
  token = token = response.body.access_token
})

test('Post /account/change-password/ --> change-password user', async () => {
  const data = {
    old_password: '123456',
    change_password: '123456'
  }
  return supertest(app)
    .post('/account/change-password')
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .expect(200)
    .then((response) => {
      expect(response.statusCode).toBe(200)
    })
})

afterAll(async () => {
  await server.close()
})

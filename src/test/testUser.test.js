const supertest = require('supertest')
const {app,server} = require('../../index')
const { userModel } = require('../modules/index')
let token = ''

beforeAll(async () => {
  const data = {
    password: '123456',
    email: 'admin@gmail.com'
  }
  const response = await supertest(app).post('/account/login').send(data)
  token = response.body.access_token
})

describe('User API', () => {
  test('Get /users/ --> array user', async () => {
    return supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Get /users/:id --> array user', async () => {
    return supertest(app)
      .get(`/users/2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Post /users/ --> array user', async () => {
    const data = {
      username: 'test',
      password: '123456',
      email: 'test14@gmail.com',
      role: 'user'
    }
    return supertest(app)
      .post('/users/')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ msg: 'success' })
        expect(response.statusCode).toBe(200)
      })
  })

  test('Put /users/:id --> array user', async () => {
    const data = {
      username: 'Nhien_up1'
    }
    return supertest(app)
      .put(`/users/4`)
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toBe(200)
      })
  })

  test('Delete /users/ --> array user', async () => {
    return supertest(app)
      .delete(`/users/12`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ msg: 'Delete a user' })
        expect(response.statusCode).toBe(200)
      })
  })
})

afterAll(async () => {
  await server.close()
})
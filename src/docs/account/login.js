module.exports = {
  post: {
    tags: ['Account'],
    description: 'Login user',
    operationId: 'login',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Account'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User login successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

module.exports = {
  post: {
    tags: ['Account'],
    description: 'register',
    operationId: 'register',
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
        description: 'User register successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

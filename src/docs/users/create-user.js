module.exports = {
  post: {
    tags: ['Users'],
    description: 'Create user',
    operationId: 'createUser',
    parameters: [],
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Users'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

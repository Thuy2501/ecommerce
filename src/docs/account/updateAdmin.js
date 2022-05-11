module.exports = {
  post: {
    tags: ['Account'],
    description: 'updateAdmin',
    operationId: 'updateAdmin',
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
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email',
                example: 'test@gmail.com'
              },
              role: {
                type: 'string',
                description: 'User role',
                example: 'admin'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User change password successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

module.exports = {
  put: {
    tags: ['Account'],
    description: 'Change password user',
    operationId: 'changePassword',
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
              old_password: {
                type: 'string',
                description: 'User old_password',
                example: '123456'
              },
              new_password: {
                type: 'string',
                description: 'User new_password',
                example: '1234567'
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

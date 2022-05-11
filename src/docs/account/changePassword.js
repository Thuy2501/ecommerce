module.exports = {
  post: {
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
              change_password: {
                type: 'string',
                description: 'User change_password',
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

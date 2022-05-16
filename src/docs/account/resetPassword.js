module.exports = {
  put: {
    tags: ['Account'],
    description: 'Reset password user',
    operationId: 'resetPassword',
    parameters: [],
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
                }
              }
            }
          }
        
      }
    },
    responses: {
      201: {
        description: 'User reset password successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

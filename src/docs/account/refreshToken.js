module.exports = {
  post: {
    tags: ['Account'],
    description: 'refresh-token',
    operationId: 'refresh-token',
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
              rf_token: {
                type: 'string',
                description: 'refresh-token',
                example: '*******'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User refresh-token successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

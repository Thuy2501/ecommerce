module.exports = {
  get: {
    tags: ['Account'],
    description: 'Get a Account',
    operationId: 'getAccount',
    parameters: [],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Account is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Account'
            }
          }
        }
      },
      404: {
        description: 'Account is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the Account",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

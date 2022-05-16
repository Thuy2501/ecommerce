module.exports = {
  put: {
    tags: ['Account'],
    description: 'Update Account',
    operationId: 'updateAccount',
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
              username: {
                type: 'string',
                description: 'User username',
                example: 'up_name'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Account updated successfully'
      },
      404: {
        description: 'Account not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

module.exports = {
  get: {
    tags: ['Users'],
    description: 'Get user',
    operationId: 'getUsers',
    parameters: [
      {
        in: 'query',
        name: 'offset',
        schema: {
          type: 'integer',
          minimum: 0,
          default: 0
        },
        required: false,
        description:
          'The number of items to skip before starting to collect the result set.'
      },
      {
        in: 'query',
        name: 'limit',
        schema: {
          type: 'integer',
          minimum: 0,
          default: 0
        },
        required: false,
        description: 'The numbers of items to return'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Users were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Users'
            }
          }
        }
      }
    }
  }
}

module.exports = {
  get: {
    tags: ['Users'],
    description: 'Get user',
    operationId: 'getUsers',
    parameters: [
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          minimum: 1,
          default: 1
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
          default: 3
        },
        required: false,
        description: 'The numbers of items to return'
      },
      {
        in: 'query',
        name: 'username',
        schema: {
          type: 'string',
          default: 'admin'
        },
        required: false,
        description: 'The user name'
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

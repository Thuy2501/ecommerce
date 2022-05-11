module.exports = {
  get: {
    tags: ['Flashsales'],
    description: 'Get flashsaleTime',
    operationId: 'getflashsaleTime',
    parameters: [
      {
        in: 'query',
        name: 'page',
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
        description: 'Orders were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Orders'
            }
          }
        }
      }
    }
  }
}

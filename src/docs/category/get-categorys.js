module.exports = {
  get: {
    tags: ['Categorys'],
    description: 'Get Categorys',
    operationId: 'getCategorys',
    parameters: [
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
      },
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
        name: 'name',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The name of items to return'
      }
    ],
    responses: {
      200: {
        description: 'Categorys were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Categorys'
            }
          }
        }
      }
    }
  }
}

module.exports = {
  get: {
    tags: ['Products'],
    description: 'Get Product',
    operationId: 'getProducts',
    parameters: [
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
        name: 'name',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The name of items to return'
      },

      {
        in: 'query',
        name: 'description',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The description of items to return'
      },
      {
        in: 'query',
        name: 'priceMin',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The name of items to return'
      },
      {
        in: 'query',
        name: 'priceMax',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The name of items to return'
      }
    ],
    responses: {
      200: {
        description: 'Products were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Products'
            }
          }
        }
      }
    }
  }
}

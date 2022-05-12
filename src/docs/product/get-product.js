module.exports = {
  get: {
    tags: ['Products'],
    description: 'Get a Products',
    operationId: 'getProduct',
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
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single Product id'
      }
    ],
    responses: {
      200: {
        description: 'Product is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Products'
            }
          }
        }
      },
      404: {
        description: 'Product is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the Product",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

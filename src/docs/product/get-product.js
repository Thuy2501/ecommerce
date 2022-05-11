module.exports = {
  get: {
    tags: ['Products'],
    description: 'Get a Products',
    operationId: 'getProduct',
    parameters: [
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

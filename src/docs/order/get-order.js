module.exports = {
  get: {
    tags: ['Orders'],
    description: 'Get a Order',
    operationId: 'getOrder',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single Order id'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Order is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Orders'
            }
          }
        }
      },
      404: {
        description: 'Order is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the Order",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

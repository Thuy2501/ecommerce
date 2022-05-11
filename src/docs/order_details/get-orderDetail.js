module.exports = {
  get: {
    tags: ['OrderDetails'],
    description: 'Get a OrderDetail',
    operationId: 'getOrderDetail',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single OrderDetail id'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'OrderDetails is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrderDetails'
            }
          }
        }
      },
      404: {
        description: 'OrderDetails is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the OrderDetails",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

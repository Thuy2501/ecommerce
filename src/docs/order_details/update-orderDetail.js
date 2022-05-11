module.exports = {
  put: {
    tags: ['OrderDetails'],
    description: 'Update OrderDetails',
    operationId: 'updateOrderDetails',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of OrderDetails to be updated'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/OrderDetails'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'OrderDetails updated successfully'
      },
      404: {
        description: 'OrderDetails not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

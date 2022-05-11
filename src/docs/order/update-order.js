module.exports = {
  put: {
    tags: ['Orders'],
    description: 'Update Orders',
    operationId: 'updateOrder',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of Order to be updated'
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
            $ref: '#/components/schemas/Orders'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Order updated successfully'
      },
      404: {
        description: 'Order not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

module.exports = {
  delete: {
    tags: ['Orders'],
    description: 'Deleting a Orders',
    operationId: 'deleteOrder',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a done Order'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Order deleted successfully'
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

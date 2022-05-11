module.exports = {
  delete: {
    tags: ['OrderDetails'],
    description: 'Deleting a OrderDetails',
    operationId: 'deleteOrderDetails',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a done OrderDetails'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'OrderDetails deleted successfully'
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

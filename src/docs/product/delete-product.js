module.exports = {
  delete: {
    tags: ['Products'],
    description: 'Deleting a Products',
    operationId: 'deleteProduct',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a done Products'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Product deleted successfully'
      },
      404: {
        description: 'Product not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
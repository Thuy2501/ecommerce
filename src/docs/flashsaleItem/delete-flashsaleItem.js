module.exports = {
  delete: {
    tags: ['FlashsaleItem'],
    description: 'Deleting a FlashsaleItem',
    operationId: 'deleteFlashsaleItem',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a done FlashsaleItem'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'FlashsaleItem deleted successfully'
      },
      404: {
        description: 'FlashsaleItem not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
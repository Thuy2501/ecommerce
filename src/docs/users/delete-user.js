module.exports = {
  delete: {
    tags: ['Users'],
    description: 'Deleting a user',
    operationId: 'deleteUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Deleting a done user'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'User deleted successfully'
      },
      404: {
        description: 'User not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
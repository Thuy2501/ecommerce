module.exports = {
  put: {
    tags: ['Users'],
    description: 'update Users',
    operationId: 'update Users',
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email',
                example: 'test@gmail.com'
              },
              username: {
                type: 'string',
                description: 'user name',
                example: 'Nhien'
              },
              role: {
                type: 'string',
                description: 'User role',
                example: 'admin'
              },
              verify: {
                type: 'boolean',
                description: 'User verify',
                example: 'false'
              },
              status: {
                type: 'boolean',
                description: 'User verify',
                example: 'true'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'User change password successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

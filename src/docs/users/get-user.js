module.exports = {
  get: {
    tags: ['Users'],
    description: 'Get a user',
    operationId: 'getUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single user id'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'User is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Users'
            }
          }
        }
      },
      404: {
        description: 'User is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the user",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

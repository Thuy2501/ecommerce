module.exports = {
  get: {
    tags: ['Account'],
    description: 'verify',
    operationId: 'verify',
    parameters: [
      {
        name: 'token',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/token'
        },
        required: true,
        description: 'verify'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],

    responses: {
      201: {
        description: 'User verify successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

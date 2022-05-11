module.exports = {
  post: {
    tags: ['Orders'],
    description: 'Create Orders',
    operationId: 'createOrder',
    parameters: [],
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
      201: {
        description: 'Order created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

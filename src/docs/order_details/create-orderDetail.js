module.exports = {
  post: {
    tags: ['OrderDetails'],
    description: 'Create OrderDetails',
    operationId: 'createOrderDetails',
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
            $ref: '#/components/schemas/OrderDetails'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'OrderDetails created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

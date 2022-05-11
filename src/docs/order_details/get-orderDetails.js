module.exports = {
  get: {
    tags: ['OrderDetails'],
    description: 'Get OrderDetails',
    operationId: 'getOrderDetails',
    parameters: [],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'OrderDetails were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrderDetails'
            }
          }
        }
      }
    }
  }
}

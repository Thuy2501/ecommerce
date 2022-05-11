module.exports = {
  post: {
    tags: ['Vouchers'],
    description: 'Create Vouchers',
    operationId: 'createVouchers',
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
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description: 'User code'
              },
              quantity: {
                type: 'string',
                description: 'quantity',
                example: '12'
              },
              value: {
                type: 'string',
                description: 'value',
                example: '20'
              },
              status: {
                type: 'string',
                description: 'status',
                example: 'true'
              },
              start_time: {
                type: 'string',
                description: 'start_time',
                example: '2022-05-09 13:15:00'
              },
              end_time: {
                type: 'number',
                description: 'end_time',
                example: '2022-05-20 13:15:00'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Product created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

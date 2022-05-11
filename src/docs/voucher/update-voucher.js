module.exports = {
  put: {
    tags: ['Vouchers'],
    description: 'Update voucher',
    operationId: 'updateVoucher',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of voucher to be updated'
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
                example: 'false'
              },
              start_time: {
                type: 'string',
                description: 'start_time',
                example: '2022-04-28 06:05:02'
              },
              end_time: {
                type: 'number',
                description: 'end_time',
                example: '2022-08-09 13:15:00'
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Todo updated successfully'
      },
      404: {
        description: 'Todo not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

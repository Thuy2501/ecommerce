module.exports = {
  put: {
    tags: ['Flashsales'],
    description: 'Update Flashsales',
    operationId: 'UpdateFlashsales',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of Flashsales to be updated'
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
              name: {
                type: 'string',
                description: 'name',
                example: '9h'
              },
              description: {
                type: 'string',
                description: 'description',
                example: 'sale 15.5'
              },
              start_time: {
                type: 'string',
                description: 'start_time',
                example: '2022-05-09 9:00:00'
              },
              end_time: {
                type: 'number',
                description: 'end_time',
                example: '2022-05-9 12:00:00'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Flashsales Updated successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

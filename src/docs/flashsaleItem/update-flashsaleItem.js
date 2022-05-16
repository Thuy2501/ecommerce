module.exports = {
  put: {
    tags: ['FlashsaleItem'],
    description: 'Update FlashsaleItem',
    operationId: 'UpdateFlashsaleItem',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of Product to be updated'
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
              discount: {
                type: 'float',
                description: 'discount',
                example: '10'
              },
              quantity: {
                type: 'integer',
                description: 'quantity',
                example: '2'
              },
              id_product: {
                type: 'integer',
                description: 'id_product',
                example: '1'
              },
              id_flashsale: {
                type: 'integer',
                description: 'id_flashsale',
                example: '1'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'FlashsaleItem Updated successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

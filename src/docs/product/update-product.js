module.exports = {
  put: {
    tags: ['Products'],
    description: 'Update Products',
    operationId: 'updateProduct',
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
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'User email',
                example: 'apple'
              },
              price: {
                type: 'string',
                description: 'price',
                example: '12'
              },
              import_price: {
                type: 'string',
                description: 'import_price',
                example: '20'
              },
              description: {
                type: 'string',
                description: 'description',
                example: 'a apple'
              },
              barcode: {
                type: 'string',
                description: 'barcode',
                example: '123456'
              },
              quantity: {
                type: 'number',
                description: 'quantity',
                example: '10'
              },
              image: {
                type: 'string',
                format: 'binary'
              },
              image_detail: {
                type: 'array',
                items: {
                  type: 'string',
                  format: 'binary'
                }
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Product updated successfully'
      },
      404: {
        description: 'Product not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
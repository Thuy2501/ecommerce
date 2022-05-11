module.exports = {
  post: {
    tags: ['Products'],
    description: 'Create Product',
    operationId: 'createProduct',
    summary: 'Uploads a file',

    parameters: [],
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
              },
              id_category: {
                type: 'number',
                description: 'quantity',
                example: '1'
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

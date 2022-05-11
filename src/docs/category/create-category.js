module.exports = {
  post: {
    tags: ['Categorys'],
    description: 'Create Category',
    operationId: 'createCategory',
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
                description: 'Name category',
                example: 'apple'
              },
              status: {
                type: 'boolean',
                description: 'price',
                example: '12'
              },
              index: {
                type: 'integer',
                description: 'index',
                example: '1'
              },
              banner: {
                type: 'string',
                format: 'binary'
              }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Categorys created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

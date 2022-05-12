module.exports = {
  put: {
    tags: ['Categorys'],
    description: 'Update Categorys',
    operationId: 'updateCategorys',
    summary: 'Uploads a file',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'Id of Categorys to be updated'
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
      200: {
        description: 'Categorys updated successfully'
      },
      404: {
        description: 'Categorys not found'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}
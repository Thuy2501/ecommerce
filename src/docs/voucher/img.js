module.exports = {
  post: {
    tags: ['Vouchers'],
    description: 'Create post',
    operationId: 'post',
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
      201: {
        description: 'Vouchers created successfully'
      },
      500: {
        description: 'Server error'
      }
    }
  }
}

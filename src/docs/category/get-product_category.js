module.exports = {
  get: {
    tags: ['Categorys'],
    description: 'Get a Categorys',
    operationId: 'getProductCategorys',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id'
        },
        required: true,
        description: 'A single Categorys id'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Categorys is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Categoryss'
            }
          }
        }
      },
      404: {
        description: 'Categorys is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the Categorys",
                internal_code: 'Invalid id'
              }
            }
          }
        }
      }
    }
  }
}

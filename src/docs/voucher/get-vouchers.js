module.exports = {
  get: {
    tags: ['Vouchers'],
    description: 'Get Vouchers',
    operationId: 'getVouchers',
    parameters: [
      {
        in: 'query',
        name: 'limit',
        schema: {
          type: 'integer',
          minimum: 0,
          default: 0
        },
        required: false,
        description: 'The numbers of items to return'
      },
      {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          minimum: 0,
          default: 0
        },
        required: false,
        description:
          'The number of items to skip before starting to collect the result set.'
      },

      {
        in: 'query',
        name: 'code',
        schema: {
          type: 'string'
        },
        required: false,
        description: 'The code of items to return'
      },
      {
        in: 'query',
        name: 'valueMin',
        schema: {
          type: 'integer'
        },
        required: false,
        description: 'The valueMin of items to return'
      },
      {
        in: 'query',
        name: 'valueMax',
        schema: {
          type: 'integer'
        },
        required: false,
        description: 'The valueMax of items to return'
      }
    ],
    security: [
      {
        bearerAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Users were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Users'
            }
          }
        }
      }
    }
  }
}

module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      id: {
        type: 'string'
      },
      token: {
        type: 'string'
      },
      Account: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'User email',
            example: 'admin1@yopmail.com'
          },
          password: {
            type: 'string',
            description: 'User password',
            example: '123456'
          }
        }
      },
      Users: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'User name',
            example: 'test'
          },
          email: {
            type: 'string',
            description: "User's email",
            example: 'test@gmail.com'
          },

          role: {
            type: 'string',
            description: "User's role",
            example: 'user'
          }
        }
      },
      Products: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'name product',
            example: 'apple'
          },
          price: {
            type: 'string',
            description: 'price product',
            example: '12'
          }
        }
      },
      Orders: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Order name',
            example: 'Nhien'
          },
          phone: {
            type: 'string',
            description: 'User phone',
            example: '0123456890'
          },
          address: {
            type: 'string',
            description: "User's address",
            example: 'Hà Nội'
          },
          voucher_id: {
            type: 'integer',
            description: "User's voucher_id",
            example: '20'
          },
          order_details: {
            type: 'array',
            example: [
              {
                id_product: '1',
                qty: '2'
              },
              {
                id_product: '2',
                qty: '1'
              }
            ]
          }
        }
      },
      OrderDetails: {
        type: 'Object',
        properties: {
          price: {
            type: 'string',
            description: 'price product',
            example: '12'
          },
          qty: {
            type: 'number',
            description: 'quantity of product',
            example: '1'
          },
          id_product: {
            type: 'string',
            description: 'id of the product ordering',
            example: '1'
          },
          order_id: {
            type: 'integer',
            description: 'id of the order',
            example: '1'
          }
        }
      },
      Vouchers: {
        type: 'Object',
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
            example: '28/4/2022 13:15:00'
          },
          end_time: {
            type: 'number',
            description: 'end_time',
            example: '29/4/2022 13:15:00'
          }
        }
      },
      Categorys: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'name category',
            example: 'apple'
          },
          status: {
            type: 'string',
            description: 'status category',
            example: '12'
          }
        }
      },
      Flashsales: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'name flashsale',
            example: 'apple'
          },
          status: {
            type: 'string',
            description: 'status flashsale',
            example: '12'
          }
        }
      },
      flashsaleItems: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'name flashsaleItems',
            example: 'apple'
          },
          status: {
            type: 'string',
            description: 'status flashsaleItems',
            example: '12'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    }
  }
}
// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Restaurante Chelita',
      version: '1.0.0',
      description: 'Documentación de la API (usuarios, platos, categorías).',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        // --- estándar de respuesta ---
        StandardOk: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: true },
            mensaje: { type: 'string', example: 'OK' },
            data: { type: 'object' }
          }
        },
        StandardFail: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: false },
            mensaje: { type: 'string', example: 'Error' },
            extra: { type: 'object', nullable: true }
          }
        },

        // --- usuarios ---
        UsuarioInput: {
          type: 'object',
          required: ['nombre', 'correo', 'id_rol'],
          properties: {
            nombre: { type: 'string', example: 'Andrea Flores' },
            correo: { type: 'string', example: 'andrea@chelita.com' },
            id_rol: { type: 'integer', example: 2 }
          }
        },
        UsuarioUpdate: {
          allOf: [
            { $ref: '#/components/schemas/UsuarioInput' },
            {
              type: 'object',
              properties: {
                estado: { type: 'string', enum: ['activo', 'inactivo'], example: 'activo' }
              }
            }
          ]
        },

        // --- platos ---
        PlatoInput: {
          type: 'object',
          required: ['nombre', 'descripcion', 'precio', 'id_categoria'],
          properties: {
            nombre: { type: 'string', example: 'Ají de Gallina' },
            descripcion: { type: 'string', example: 'Crema de ají amarillo con pollo' },
            precio: { type: 'number', format: 'float', example: 15.0 },
            id_categoria: { type: 'integer', example: 2 },
            estado: { type: 'string', enum: ['activo', 'inactivo'], example: 'activo' }
          }
        },
        PlatoUpdate: {
          allOf: [
            { $ref: '#/components/schemas/PlatoInput' }
          ]
        },

        // --- categorías (¡estos son los que faltaban!)
        CategoriaInput: {
          type: 'object',
          required: ['nombre'],
          properties: {
            nombre: { type: 'string', example: 'Bebidas' },
            descripcion: { type: 'string', nullable: true, example: 'Gaseosas y jugos' }
          }
        },
        CategoriaUpdate: {
          allOf: [
            { $ref: '#/components/schemas/CategoriaInput' },
            {
              type: 'object',
              properties: {
                estado: { type: 'string', enum: ['activo', 'inactivo'], example: 'activo' }
              }
            }
          ]
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // escanea tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };

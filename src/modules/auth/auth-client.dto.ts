import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

const clientServiceSchema = z.object({
  serviceName: z.string(),
  callbackUrl: z.string().url(),
})

const clientServiceResponseSchema = clientServiceSchema.extend({
  id: z.number(),
  createdAt: z.date(),
})

export const CreateClientServiceSchemaZ = extendApi(clientServiceSchema, {
  example: {
    serviceName: 'payrup admin develope',
    callbackUrl: 'http://localhost:3000',
  },
})

export const UpdateClientServiceSchemaZ = extendApi(
  clientServiceSchema.extend({
    id: z.number(),
  }),
  {
    example: {
      id: 1,
      serviceName: 'payrup admin develope',
      callbackUrl: 'http://localhost:3000',
    },
  },
)

export const ClientServiceResponseSchemaZ = extendApi(
  clientServiceResponseSchema,
  {
    example: {
      id: 1,
      serviceName: 'payrup admin develope',
      callbackUrl: 'http://localhost:3000',
      createdAt: new Date(),
    },
  },
)

export const ClientServicesResponseSchemaZ = extendApi(
  z.array(clientServiceResponseSchema),
  {
    example: [
      {
        id: 1,
        serviceName: 'payrup admin develope',
        callbackUrl: 'http://localhost:3000',
        createdAt: new Date(),
      },
    ],
  },
)

export class CreateClientServiceDto extends createZodDto(
  CreateClientServiceSchemaZ,
) {}

export class UpdateClientServiceDto extends createZodDto(
  UpdateClientServiceSchemaZ,
) {}

export class ClientServiceResponseDto extends createZodDto(
  ClientServiceResponseSchemaZ,
) {}

export class ClientServicesResponseDto extends createZodDto(
  ClientServicesResponseSchemaZ,
) {}

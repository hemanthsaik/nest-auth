import { EntitySchema } from 'typeorm'
import { Service, UserLogs } from './auth.type'

export const UserEntitySchema = new EntitySchema<UserLogs>({
  name: 'userLogs',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    emailId: {
      type: 'varchar',
    },
    lastSignedIn: {
      type: 'timestamp',
      updateDate: true,
    },
    expiresAt: {
      type: 'timestamp',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    serviceId: {
      type: 'integer',
    },
    token: {
      type: 'varchar',
      length: '2500',
    },
  },
  relations: {
    service: {
      type: 'many-to-one',
      target: 'service',
    },
  },
})

export const ServiceEntitySchema = new EntitySchema<Service>({
  name: 'service',
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    serviceName: {
      type: 'varchar',
    },
    callbackUrl: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
})

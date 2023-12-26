import { EntitySchema } from 'typeorm'
import { UserLogs, service } from './auth.type'

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
    token: {
      type: 'varchar',
      length: '2500',
    },
  },
})

export const ServiceEntitySchema = new EntitySchema<service>({
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

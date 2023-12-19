import {
  Column,
  CreateDateColumn,
  Entity,
  EntitySchema,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserLogs } from './auth.type'

export const userEntitySchema = new EntitySchema<UserLogs>({
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
    lastSignedIn: {
      type: 'timestamp',
      createDate: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
})

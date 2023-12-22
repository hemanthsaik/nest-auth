import {
  ServiceEntitySchema,
  UserEntitySchema,
} from '../../modules/auth/auth.schema'
import { EntitySchema } from 'typeorm'

export const AuthTypeormEntities: EntitySchema[] = [
  UserEntitySchema,
  ServiceEntitySchema,
]

import { EntitySchema } from 'typeorm'
import {
  serviceEntitySchema,
  userEntitySchema,
} from './modules/auth/auth.schema'

export const AllBaseTypeormEntities: EntitySchema[] = [
  userEntitySchema,
  serviceEntitySchema,
]

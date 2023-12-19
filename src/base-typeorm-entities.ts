import { EntitySchema } from 'typeorm'
import { userEntitySchema } from './modules/auth/auth.entity'
export const AllBaseTypeormEntities: EntitySchema[] = [userEntitySchema]

import 'dotenv/config'
import { DataSource } from 'typeorm'
import { convertMysqlConfigToTypeormConfig } from 'src/config/typeorm-config.factory'
import { makeMysqlAdminConfig } from '../../config/config.factory'
import { AdminTypeormEntities } from 'src/entities/Admin'
import { AdminMigration } from 'src/migrations/Admin'

export default new DataSource({
  ...convertMysqlConfigToTypeormConfig(makeMysqlAdminConfig()),
  entities: AdminTypeormEntities,
  migrations: AdminMigration,
})

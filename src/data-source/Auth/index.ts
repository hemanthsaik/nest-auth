import 'dotenv/config'
import { makeMysqlAuthConfig } from '../../config/config.factory'
import { convertMysqlConfigToTypeormConfig } from '../../config/typeorm-config.factory'
import { AuthTypeormEntities } from '../../entities/Auth'
import { AuthMigration } from '../../migrations/Auth'
import { DataSource } from 'typeorm'

export default new DataSource({
  ...convertMysqlConfigToTypeormConfig(makeMysqlAuthConfig()),
  entities: AuthTypeormEntities,
  migrations: AuthMigration,
})

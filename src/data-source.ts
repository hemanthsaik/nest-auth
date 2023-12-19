import 'dotenv/config'
import { DataSource } from 'typeorm'
import { AllBaseTypeormEntities } from './base-typeorm-entities'
import { makeMysqlConfig } from './config/config.factory'
import { convertMysqlConfigToTypeormConfig } from './config/typeorm-config.factory'

export default new DataSource({
  ...convertMysqlConfigToTypeormConfig(makeMysqlConfig()),
  entities: AllBaseTypeormEntities,
})

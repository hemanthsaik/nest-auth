import { DataSourceOptions } from 'typeorm'
// import { AllMigrations } from ''
import { MysqlConfig } from './config.interface'
import { AllBaseTypeormEntities } from 'src/base-typeorm-entities'
import { AllMigration } from 'src/migrations'

/**
 * Convert our config to be compatible with the typeorm configuration
 *
 * @param {MysqlConfig} config our mySql config
 */
export const convertMysqlConfigToTypeormConfig = (
  config: MysqlConfig,
): DataSourceOptions => {
  console.log({
    type: 'mysql',
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.user,
    password: config.password,
  })

  return {
    type: 'mysql',
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.user,
    password: config.password,
    synchronize: false,
    migrationsRun: true,
    migrations: AllMigration,
  }
}

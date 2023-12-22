import { DataSourceOptions } from 'typeorm'
// import { AllMigrations } from '../migrations'
import { MysqlConfig } from './config.interface'

/**
 * Convert our config to be compatible with the typeorm configuration
 *
 * @param {MysqlConfig} config our mySql config
 */
export const convertMysqlConfigToTypeormConfig = (
  config: MysqlConfig,
): DataSourceOptions => {
  return {
    type: 'mysql',
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.user,
    password: config.password,
    synchronize: false,
    migrationsRun: true,
  }
}

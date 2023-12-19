import 'dotenv/config'
import * as env from 'env-var'
import { constants } from '../constants'
import {
  AppConfig,
  AppEnv,
  Config,
  JwtConfig,
  MysqlConfig,
} from './config.interface'

export const makeJwtConfig = (): JwtConfig => {
  return {
    secret: env.get(constants.JWT_SECRET).required().asString(),
  }
}

/**
 * Make the mysql configuration from environment variables
 *
 * @return {MysqlConfig} the mysql config
 */
export const makeMysqlConfig = (): MysqlConfig => {
  return {
    host: env.get(constants.MYSQL_SERVER).required().asString(),
    port: env.get(constants.MYSQL_PORT).default(3308).asInt(),
    user: env.get(constants.MYSQL_USER).required().asString(),
    password: env.get(constants.MYSQL_PASSWORD).required().asString(),
    database: env.get(constants.MYSQL_DATABASE).required().asString(),

    schema: env.get(constants.MYSQL_SCHEMA).required().asString(),
  }
}

/**
 * Get the app environment setting
 *
 * @return {AppEnv} the app env setting
 */
export const makeAppEnvConfig = (): AppEnv => {
  return env
    .get(constants.NODE_ENV)
    .default('development')
    .asEnum(['production', 'development'])
}

/**
 * Make the app configuration from environment variables
 *
 * @return {AppConfig} the app configuration
 */
export const makeAppConfig = (): AppConfig => {
  const environment = makeAppEnvConfig()
  return {
    port: env.get(constants.PORT).default(8000).asPortNumber(),
    environment,
  }
}

/**
 * Make the whole configuration from environment variables
 *
 * @return {Config} the whole config
 */
export const makeConfig = (): Config => {
  return {
    mysql: makeMysqlConfig(),
    app: makeAppConfig(),
    jwt: makeJwtConfig(),
  }
}

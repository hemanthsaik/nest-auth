import 'dotenv/config'
import * as env from 'env-var'
import {
  AppConfig,
  AppEnv,
  Config,
  MysqlConfig,
  GoogleConfig,
  PayrupUrlConfig,
} from './config.interface'
import { constants } from '../constants'

export const JWT_SECRET_KEY = env
  .get(constants.JWT_SECRET)
  .required()
  .asString()

/**
 * Make the mysql configuration from environment variables
 *
 * @return {MysqlConfig} the mysql config
 */
export const makeMysqlAuthConfig = (): MysqlConfig => {
  return {
    host: env.get(constants.MYSQL_AUTH_SERVER).required().asString(),
    port: env.get(constants.MYSQL_AUTH_PORT).default(3308).asInt(),
    user: env.get(constants.MYSQL_AUTH_USER).required().asString(),
    password: env.get(constants.MYSQL_AUTH_PASSWORD).required().asString(),
    database: env.get(constants.MYSQL_AUTH_DATABASE).required().asString(),
  }
}

export const makeMysqlAdminConfig = (): MysqlConfig => {
  return {
    host: env.get(constants.MYSQL_ADMIN_SERVER).required().asString(),
    port: env.get(constants.MYSQL_ADMIN_PORT).default(3307).asInt(),
    user: env.get(constants.MYSQL_ADMIN_USER).required().asString(),
    password: env.get(constants.MYSQL_ADMIN_PASSWORD).required().asString(),
    database: env.get(constants.MYSQL_ADMIN_DATABASE).required().asString(),
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
 * Make the app configuration from environment variables
 *
 * @return {PayrupUrlConfig} the app configuration
 */
export const makePayrupUrlConfig = (): PayrupUrlConfig => {
  return {
    general: env.get(constants.PAYRUP_GENERAL_URL).required().asString(),
    payment: env.get(constants.PAYRUP_PAYMENT_URL).required().asString(),
    wallet: env.get(constants.PAYRUP_WALLET_URL).required().asString(),
  }
}

/**
 * Get the google provider setting
 *
 * @return {GoogleConfig} the google env setting
 */

export const googleConfig = (): GoogleConfig => {
  return {
    clientID: env.get(constants.GOOGLE_CLIENT_ID).required().asString(),
    clientSecret: env.get(constants.GOOGLE_CLIENT_SECRET).required().asString(),
    callbackURL: env.get(constants.GOOGLE_CALLBACK_URL).required().asString(),
  }
}
/**
 * Make the whole configuration from environment variables
 *
 * @return {Config} the whole config
 */
export const makeConfig = (): Config => {
  return {
    mysqlAuth: makeMysqlAuthConfig(),
    mysqlAdmin: makeMysqlAdminConfig(),
    google: googleConfig(),
    app: makeAppConfig(),
  }
}

import 'dotenv/config'
import * as env from 'env-var'
import {
  AppConfig,
  AppEnv,
  Config,
  MysqlConfig,
  GoogleConfig,
} from './config.interface'
import { constants } from '../constants'

export const JWT_SECRET_KEY = env
  .get(constants.JWT_SECRET)
  .required()
  .asString()
// export const JWT_REFRESH_KEY = env
//   .get(constants.JWT_REFRESH)
//   .required()
//   .asString()

/**
 * Make the mysql configuration from environment variables
 *
 * @return {MysqlConfig} the mysql config
 */
// export const makeMysqlConfig = (): MysqlConfig => {
//   return {
//     host: env.get(constants.MYSQL_SERVER).required().asString(),
//     port: env.get(constants.MYSQL_PORT).default(3308).asInt(),
//     user: env.get(constants.MYSQL_USER).required().asString(),
//     password: env.get(constants.MYSQL_PASSWORD).required().asString(),
//     database: env.get(constants.MYSQL_DATABASE).required().asString(),

//     //TODO: check if schema is needed
//     schema: env.get(constants.MYSQL_SCHEMA).required().asString(),
//     trustServerCertificate: env
//       .get(constants.MYSQL_TRUST_SERVER_CERTIFICATE)
//       .default(0)
//       .asBool(),
//   }
// }

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
    // mysql: makeMysqlConfig(),
    google: googleConfig(),
    app: makeAppConfig(),
  }
}

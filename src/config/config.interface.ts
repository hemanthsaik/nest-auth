/**
 * The postgres connection configuration
 */
export type MysqlConfig = {
  /**
   * Database host
   */
  host: string

  /**
   * Database port
   */
  port: number

  /**
   * Database username
   */
  user: string

  /**
   * Database password=
   */
  password: string

  /**
   * Database name
   */
  database: string
}

/**
 * The node environment app should reflect
 */
export type AppEnv = 'development' | 'production'

/**
 * The application configuration
 */
export type AppConfig = {
  /**
   * The port the server should listen on
   */
  port: number
  /**
   * The node environment app should reflect
   */
  environment: AppEnv
}

/**
 * The payrup url configuration
 */

export type PayrupUrlConfig = {
  general: string
  payment: string
  wallet: string
}

/**
 * The google provider configuration
 */
export type GoogleConfig = {
  clientID: string
  clientSecret: string
  callbackURL: string
}

export type Config = {
  mysqlAuth: MysqlConfig
  mysqlAdmin: MysqlConfig
  google: GoogleConfig
  app: AppConfig
}

/**
 * Symbol for NestJS resolving
 */
export const Config = Symbol('Config')

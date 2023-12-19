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

  /**
   * Database schema
   */
  schema: string
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
export type JwtConfig = {
  /**
   * the secret
   */
  secret: string
}
export type Config = {
  mysql: MysqlConfig
  app: AppConfig
  jwt: JwtConfig
}

/**
 * Symbol for NestJS resolving
 */
export const Config = Symbol('Config')

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { Config } from './config/config.interface'
import { ConfigModule } from './config/config.module'
import { convertMysqlConfigToTypeormConfig } from './config/typeorm-config.factory'
import { LoggerModule } from './logger/logger.module'
import { AuthModule } from './modules/auth/auth.module'
import { ProxyModule } from './modules/proxy/proxy.module'
import { AuthMigration } from './migrations/Auth'

config()

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          ...convertMysqlConfigToTypeormConfig(config.mysqlAuth),
          migrations: AuthMigration,
          logging: config.app.environment === 'development' ? true : false,
          autoLoadEntities: true,
        }
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          ...convertMysqlConfigToTypeormConfig(config.mysqlAdmin),
          name: 'admin',
          migrations: [],
          logging: config.app.environment === 'development' ? true : false,
          autoLoadEntities: true,
        }
      },
    }),
    ProxyModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionsGuard,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ZodValidationPipe,
    // },
  ],
})
export class AppModule {}

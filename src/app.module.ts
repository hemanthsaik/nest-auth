import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { Config } from './config/config.interface'
import { ConfigModule } from './config/config.module'
import { convertMysqlConfigToTypeormConfig } from './config/typeorm-config.factory'
import { LoggerModule } from './logger/logger.module'
import { AuthMigration } from './migrations/Auth'
import { AuthModule } from './modules/auth/auth.module'
import { ProxyModule } from './modules/proxy/proxy.module'

config()

@Module({
  imports: [
    CacheModule.register({
      ttl: 60000000,
      isGlobal: true,
    }),
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
      name: 'admin',
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => {
        return {
          ...convertMysqlConfigToTypeormConfig(config.mysqlAdmin),
          migrationsRun: false,
          migrations: [],
          logging: config.app.environment === 'development' ? true : false,
          autoLoadEntities: false,
        }
      },
    }),
    ProxyModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

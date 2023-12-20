import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { Config } from './config/config.interface'
import { ConfigModule } from './config/config.module'
import { convertMysqlConfigToTypeormConfig } from './config/typeorm-config.factory'
import { ProxyModule } from './modules/proxy/proxy.module'
import { AuthModule } from './modules/auth/auth.module'
import { LoggerModule } from './logger/logger.module'
import { APP_GUARD } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

config()

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [Config],
    //   useFactory: (config: Config) => {
    //     return {
    //       ...convertMysqlConfigToTypeormConfig(config.mysql),
    //       logging: config.app.environment === 'development' ? true : false,
    //       autoLoadEntities: true,
    //     }
    //   },
    // }),
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

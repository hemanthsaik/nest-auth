import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from 'dotenv'
import { LoggerModule } from 'nestjs-pino'
import { Config } from './config/config.interface'
import { ConfigModule } from './config/config.module'
import { convertMysqlConfigToTypeormConfig } from './config/typeorm-config.factory'
import { AuthModule } from './modules/auth/auth.module'

config()

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => ({
        pinoHttp: {
          transport: { target: 'pino-pretty' },
          level: config.app.environment === 'development' ? 'trace' : 'error',
        },
      }),
    }),
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
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
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

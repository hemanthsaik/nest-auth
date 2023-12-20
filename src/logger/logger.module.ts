import { Module } from '@nestjs/common'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'
import { Config } from 'src/config/config.interface'
import { ConfigModule } from 'src/config/config.module'

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: (config: Config) => ({
        pinoHttp: {
          transport: { target: 'pino-pretty' },
          level: config.app.environment === 'development' ? 'trace' : 'error',
        },
      }),
    }),
  ],
})
export class LoggerModule {}
